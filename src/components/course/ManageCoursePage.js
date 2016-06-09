import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(e) {
    const field = e.target.name;
    let course = this.state.course;
    course[ field ] = e.target.value;
    return this.setState({ course });
  }

  saveCourse(e) {
    e.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm course={this.state.course}
                  onSave={this.saveCourse}
                  onChange={this.updateCourseState}
                  allAuthors={this.props.authors}
                  errors={this.state.errors} />
    );
  }
}

const { object, array } = PropTypes;

ManageCoursePage.propTypes = {
  course: object.isRequired,
  authors: array.isRequired,
  actions: object.isRequired
};

// Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: object
};

const getCourseById = (courses, id) => {
  const course = courses.filter(course => course.id == id);
  if (course.length) return course[0]; // Since filter returns an array, have to grab the first.
  return null;
};

const mapState = (state, ownProps) => {
  const courseId = ownProps.params.id; // from the path '/course/:id'

  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

  if (courseId && state.courses.length > 0) { // Cause we didn't get the course data when refresh
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course,
    authors: authorsFormattedForDropdown
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(ManageCoursePage);
