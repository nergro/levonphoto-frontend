import { connect } from "react-redux";
import App from "./app";
import { checkUser } from "../../store/actions/auth";
// import { setAuthStatus } from "../../store/actions/auth";

const mapStateToProps = state => {
  return {
    loading: state.main.loading,
    isAuth: state.auth.isAuth
  };
};

const mapDispatchToProps = {
  // setAuthStatus,
  // fetchAll
  checkUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
