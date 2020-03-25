import React from 'react';
import { StyleSheet, View} from 'react-native';

const diceWidth: number = 200;
const diceHeight: number = 200;
const dotMargins: number = 25;
const dotSize: number = 20;

export default function Dice({currentNumber}) {
  return (
    <View style={styles.diceContainer}>      
        <View style={styles.dice}>
            {currentNumber === 1 && 
            <View style={styles.dotMiddle}>
                <View style={styles.dot}></View>
            </View>
            }
            
            {currentNumber === 2 &&
            <>
                <View style={styles.dotTopLeft}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotBottomRight}>
                <View style={styles.dot}></View>
                </View>
            </>
            }

            {currentNumber === 3 &&
            <>
                <View style={styles.dotMiddle}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotTopLeft}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotBottomRight}>
                <View style={styles.dot}></View>
                </View>
            </>
            }

            {currentNumber === 4 &&
            <>
                <View style={styles.dotTopLeft}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotBottomRight}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotTopRight}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotBottomLeft}>
                <View style={styles.dot}></View>
                </View>
            </>
            }

            {currentNumber === 5 &&
            <>
                <View style={styles.dotMiddle}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotTopLeft}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotBottomRight}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotTopRight}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotBottomLeft}>
                <View style={styles.dot}></View>
                </View>
            </>
            }

            {currentNumber === 6 && 
            <>
                <View style={styles.dotCenterMiddleLeft}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotCenterMiddleRight}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotTopLeft}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotBottomRight}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotTopRight}>
                <View style={styles.dot}></View>
                </View>
                <View style={styles.dotBottomLeft}>
                <View style={styles.dot}></View>
                </View>
            </>
            }
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  diceContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '100%',
  },
  dice: {
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',

    backgroundColor: '#404040',
    width: diceWidth,
    height: diceHeight,
  },
  dot: {
    width: dotSize,
    height: dotSize,
    backgroundColor: 'white',
    borderRadius: 50,
  },

  dotMiddle: {
    position: 'absolute',
    top: ((diceHeight / 2) - (dotSize / 2)),
    left: ((diceWidth / 2) - (dotSize / 2)),
  },
  dotTopLeft: {
    position: 'absolute',
    top: dotMargins,
    left: dotMargins,
  },
  dotBottomRight: {
    position: 'absolute',
    bottom: dotMargins,
    right: dotMargins
  },
  dotBottomLeft: {
    position: 'absolute',
    bottom: dotMargins,
    left: dotMargins
  },
  dotTopRight: {
    position: 'absolute',
    top: dotMargins,
    right: dotMargins
  },
  dotCenterMiddleLeft: {
    position: 'absolute',
    top: ((diceHeight / 2) - (dotSize / 2)),
    left: dotMargins
  },
  dotCenterMiddleRight: {
    position: 'absolute',
    top: ((diceHeight / 2) - (dotSize / 2)),
    right: dotMargins
  }

});
