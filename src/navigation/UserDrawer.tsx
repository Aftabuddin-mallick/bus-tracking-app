// UserDrawer.tsx
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserHome from '../screens/user/UserHome';

const Drawer = createDrawerNavigator();

export default function UserDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={UserHome} />
    </Drawer.Navigator>
  );
}