import { deviceWidth } from '@/utils/ScreenUtils';
import { FunctionComponent, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  VirtualizedList,
  Dimensions,
} from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';

interface ReaderLayoutProps {}

const RenderItem = ({ index }: { index: number }) => {
  const [height, setHeight] = useState(320);
  return (
    <Image
      style={[styles.img, { height }]}
      onLoad={({ nativeEvent }) => {
        setHeight(
          nativeEvent.source.height *
            (Dimensions.get('window').width / nativeEvent.source.width),
        );
      }}
      source={{
        uri: `${Config.BACKEND_API}/img/998543/${(index + 1)
          .toString()
          .padStart(5, '0')}.jpg`,
      }}
    />
  );
};

const ReaderLayout: FunctionComponent<ReaderLayoutProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.container}
        data={Array.from({ length: 20 }).map((_, index) => index)}
        renderItem={({ index }) => <RenderItem index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
    // <View
    //   style={[
    //     styles.container,
    //     {
    //       backgroundColor: 'red',
    //     },
    //   ]}>
    //   <ScrollView style={styles.container}>
    // {Array.from({ length: 10 }).map((_, index) => (
    //   <FastImage
    //     style={styles.img}
    //     source={{
    //       uri: `${Config.BACKEND_API}/img/998543/00002.jpg`,
    //       priority: FastImage.priority.normal,
    //     }}
    //     resizeMode="center"
    //   />
    // ))}
    //     <FastImage
    //       style={styles.img}
    //       source={{
    //         uri: `${Config.BACKEND_API}/img/998543/00003.jpg`,
    //         priority: FastImage.priority.low,
    //       }}
    //       resizeMode="center"
    //     />
    //   </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
  },
  img: {
    width: '100%',
  },
});

export default ReaderLayout;
