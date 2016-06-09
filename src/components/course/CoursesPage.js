import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import { browserHistory } from 'react-router';

import CourseList from './CourseList';

class CoursesPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    const { courses } = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               onClick={this.redirectToAddCoursePage}
               value="Add Course"
               className="btn btn-primary" />
        <CourseList courses={courses} />
      </div>
    );
  }
}

const { object, array } = PropTypes;

CoursesPage.propTypes = {
  courses: array.isRequired,
  actions: object.isRequired
};

const mapState = (state, ownProps) => ({ courses: state.courses });

const mapDispatch = (dispatch) => ({ actions: bindActionCreators(courseActions, dispatch) });

export default connect(mapState, mapDispatch)(CoursesPage);
