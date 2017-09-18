import Layout from '../components/layout/layout';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../reducers';

class Settings extends React.Component {
  render() {
    console.log('settings props: ', this.props);
    return (
      <Layout>
        <div className='wrapper'>
          <div className='picture'>
            <img src={this.props.session.user.facebook_profile_image}></img>
          </div>
          <div className='message'>Welcome back, {this.props.session.user.firstName}</div>
          <div className='information'>information</div>
        </div>
        <style jsx>{`
          .wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
            grid-auto-rows: auto;
            grid-template-areas: 
              ". . picture . ."
              ". . message . ."
              ". information information information .";
            grid-row-gap: 1em;
          }
          .picture {
            grid-area: picture;
            text-align: center;
          }
          .picture img {
            border-radius: 50%;
          }
          .message {
            grid-area: message;
            text-align: center;
          }
          .information {
            grid-area: information;
          }
        `}</style>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({ session: state.session });

export default withRedux(makeStore, mapStateToProps)(Settings);