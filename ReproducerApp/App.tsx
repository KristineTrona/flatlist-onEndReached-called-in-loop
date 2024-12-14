import {useCallback, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

const ListFooter = ({isLoading}: {isLoading: boolean}) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.endReachedContainer}>
      <Text>End reached</Text>
    </View>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    } finally {
      setLoading(false);
    }
  };

  const onEndReached = async () => {
    console.log('CALLING ON END REACHED');

    await fetchData();
  };

  const renderItem = useCallback(({item}: {item: number}) => {
    return (
      <View style={styles.listItemContainer}>
        <Text>{item}</Text>
      </View>
    );
  }, []);

  return (
    <FlatList
      data={Array.from({length: 10}).map((_, index) => index)}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
      ListFooterComponent={<ListFooter isLoading={loading} />}
      // Adding this prop fixes it:
      // ListFooterComponentStyle={{height: 600}}
    />
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    height: 300,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    height: 200,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endReachedContainer: {
    height: 600,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
