import Layout from '../components/layout/layout';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../reducers';
import { List, Dimmer, Button, Icon } from 'semantic-ui-react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('signin props: ', this.props);
    const loginBtns = [
      {icon: 'facebook', color: 'facebook', name: 'Facebook'},
      {icon: 'google plus', color: 'google plus', name: 'Google'},
      {icon: 'twitter', color: 'twitter', name: 'Twitter'}
    ];
    return (
      <Layout>
        <Dimmer active>
          <List divided>
            <List.Item>
              <List.Content><h1>Sign in</h1></List.Content>
              <List.Content><small>Connect with your favorite social networks</small></List.Content>
            </List.Item>
            <List.List>
              <List horizontal>
                {loginBtns.map((btn) => 
                  <List.Item key={btn.name.toLowerCase()}>
                    <Button color={btn.color} href={`/auth/${btn.name.toLowerCase()}`} fluid>
                      <Icon name={`${btn.icon}`} />{` ${btn.name}`}
                    </Button>
                  </List.Item>
                )}
              </List>
            </List.List>
          </List>
        </Dimmer>
      </Layout>
    );
  }
}

export default withRedux(makeStore)(Signin);