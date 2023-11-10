import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { Home } from "./Pages/Home/home";
import { NewTask } from "./Pages/New/new";
import { HistoryTask } from "./Pages/History/history";
import { NavigationContainer } from "@react-navigation/native";


const Tab = createBottomTabNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Opens">
                <Tab.Screen 
                    name="New" 
                    component={NewTask}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused, size, color}) => {
                            return <Ionicons size={size} color={color} name={focused ? 'add' : 'add-outline'} />
                        }
                    }} 
                />
                <Tab.Screen 
                    name="Opens" 
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused, size, color}) => {
                            return <Ionicons size={size} color={color} name={focused ? 'list' : 'list-outline'} />
                        }
                    }} 
                />
                <Tab.Screen 
                    name="Finisheds" 
                    component={HistoryTask} 
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused, size, color}) => {
                            return <Ionicons size={size} color={color} name={focused ? 'time' : 'time-outline'} />
                        }
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Routes;