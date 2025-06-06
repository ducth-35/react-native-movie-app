import {ComponentProps} from 'react';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextApp from '../textApp';

type EmptyContentProps = {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
};

const EmptyContent = ({title, icon}: EmptyContentProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          backgroundColor: 'rgba(255, 99, 71, 0.2)',
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Ionicons name={icon} size={24} color={'tomato'} />
      </View>
      <TextApp preset="txt16Medium">{title}</TextApp>
    </View>
  );
};

export default EmptyContent;
