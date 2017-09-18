import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from '../nav/nav';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu, Header } from 'semantic-ui-react';
import { nprogressStyle } from './nprogressStyle';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  render() {
    const menus = [
      {key: 'order', href: '/', name: 'Order'},
      {key: 'history', href: '/history', name: 'History'},
      {key: 'settings', href: '/settings', name: 'Settings'},
      {key: 'about', href: '/about', name: 'About'}
    ];

    return (
      <div>
        <Head>
          <title>No-line</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css'></link>
        </Head>
        <Nav toggleSidebar={this.toggleSidebar} showSidebar={this.state.showSidebar}/>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='slide along'
            visible={this.state.showSidebar}
            vertical
            inverted
            width='thin'
          >
            {menus.map(menu => 
              <Link href={menu.href} key={menu.key} passHref prefetch> 
                <Menu.Item link>{menu.name}</Menu.Item>
              </Link>
            )}
            {this.props.session.isLoggedIn ? (
              <Menu.Item href='signout' link>Sign out</Menu.Item>
            ) : (
              <Link href='/signin' passHref prefetch>
                <Menu.Item link>Sign in</Menu.Item>
              </Link>
            )}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment 
              basic
              inverted
              color='grey'
              style={{height: '100vh', borderRadius: 0}}
            >
              {this.props.children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <style jsx global>{nprogressStyle}</style>
      </div>
    );
  }
}

const mapStateToProps = state => ({ session: state.session });

export default connect(mapStateToProps)(Layout);