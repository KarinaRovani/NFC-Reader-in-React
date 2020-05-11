import React, {PureComponent, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {startNFC, stopNFC} from './helpers/NFCHelper.js';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMessage: 'Aproxime o dispositivo a uma tag NFC!',
      descriptionMessage: 'Aguardando aproximação...',
      tagValue: null,
      arrayHolder: [],
    };
  }

  UNSAFE_componentWillMount() {
    startNFC(this.handleNFCTagReading);
  }

  componentWillUnmount() {
    stopNFC();
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };

  GetItem(item) {
    Alert.alert(item);
  }

  ClearAll() {
    this.setState({tagValue: null});
    this.setState({arrayHolder: []});
  }

  Vender() { //Lugar aonde eu devo fazer a conexão com o webServive
    this.setState({tagValue: null});
    this.setState({arrayHolder: []});
  }

  handleNFCTagReading = (nfcResult) => {
    if (nfcResult.Error) {
      this.setState({
        titleMessage: nfcResult.Error.Title,
        descriptionMessage: nfcResult.Error.Message,
      });
    } else {
      this.setState({tagValue: nfcResult.tagValue});
      this.setState({
        arrayHolder: [
          ...this.state.arrayHolder,
          {id: this.state.arrayHolder.length + 1, title: nfcResult.tagValue},
        ],
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.tagValue ? (
          <View style={styles.row}>
            <FlatList
              data={this.state.arrayHolder}
              width="100%"
              extraData={this.state.arrayHolder}
              keyExtractor={(index) => index.id.toString()}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({item}) => (
                <View>
                  <Text
                    style={styles.item}
                    onPress={this.GetItem.bind(this, item.title)}>
                    {item.title}
                  </Text>
                </View>
              )}
            />
            <View style={styles.footer}>
              <TouchableHighlight
                style={styles.bottomButtons}
                onPress={() => {
                  this.ClearAll();
                }}>
                <Text style={styles.footerText}>Limpar</Text>
              </TouchableHighlight>
              <Text style={styles.blank}>..</Text>
              <TouchableHighlight
                style={styles.bottomButtons}
                onPress={() => {
                  this.Vender();
                }}>
                <Text style={styles.footerText}>Vender</Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.headerMessage}>NFC Tag Reader</Text>
            <Text style={styles.titleMessage}>{this.state.titleMessage}</Text>
            <Text style={styles.descriptionMessage}>
              {this.state.descriptionMessage}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  headerMessage: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  titleMessage: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 34,
  },
  descriptionMessage: {
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center'
  },
  tagValue: {
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 18,
    color: '#77D353',
  },
  item: {
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'Avenir'
  },
  item2: {
    fontSize: 20,
    lineHeight: 40,
    width: 130,
    marginRight: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  blank: {
    fontSize: 5,
    color: '#FFF',
  },
  row: {
    flex: 2,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    marginTop: 250,
  },
  bottomButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DF4723',
    borderRadius: 10,
    height: 50,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 16,
  },
  textStyle: {
    alignSelf: 'center',
    color: 'orange'
  },
  scrollViewStyle: {
    borderWidth: 2,
    borderColor: 'blue'
  }
});
