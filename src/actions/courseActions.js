import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export const loadCoursesSuccess = (courses) => {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
};

export const createCourseSuccess = (course) => {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
};

export const updateCourseSuccess = (course) => {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
};

export const loadCourses = () => {
  return (dispatch) => {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(err => {
      throw(err);
    });
  };
};

export const saveCourse = (course) => {
  return (dispatch, getState) => {
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse));
    }).catch(err => {
      throw(err);
    });
  };
};
