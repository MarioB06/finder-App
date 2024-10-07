import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
    <View style={tw`bg-blue-500 p-4 justify-center items-center`}>
      <Text style={tw`text-white text-lg`}>Welcome to the FINDER App!</Text>
    </View>
  );
}
