import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface Laps {
  number: number
  minutes: string
  seconds: string
  miliseconds: string
}

let laps: Laps[] = []
let num = 0

export default function App() {
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timer

    if (isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 100)
      }, 100)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isPaused])

  const handleStart = () => {
    if (isPaused === true) {
      setIsPaused(false)
    } else {
      setIsPaused(true)
    }
  }

  const handleReset = () => {
    if (isPaused === true) {
      setTime(0)
      laps = []
      num = 0
    } else {
      laps.unshift({
        number: ++num,
        miliseconds: ('0' + Math.floor(time / 10)).slice(-2),
        seconds: ('0' + (Math.floor(time / 1000) % 60)).slice(-2),
        minutes: ('0' + (Math.floor(time / 60000) % 60)).slice(-2),
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {('0' + (Math.floor(time / 60000) % 60)).slice(-2)}:
        {('0' + (Math.floor(time / 1000) % 60)).slice(-2)}.
        {('0' + Math.floor(time / 10)).slice(-2)}
      </Text>

      <View style={styles.lapsHeader}>
        <Text style={styles.lapsHeaderText}>Lap</Text>
        <Text style={styles.lapsHeaderText}>Lap times</Text>
      </View>

      {laps.map((lap) => (
        <View
          key={lap.number}
          style={styles.laps}
        >
          <Text>{lap.number}</Text>
          <Text>
            {lap.minutes}:{lap.seconds}.{lap.miliseconds}
          </Text>
        </View>
      ))}

      <View style={styles.buttons}>
        <Pressable
          style={{
            width: 100,
            height: 40,
            backgroundColor: '#c4c4c4',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}
          onPress={() => {
            handleReset()
          }}
          disabled={time !== 0 ? false : true}
        >
          <Text
            style={{
              color: time !== 0 ? '#000' : '#808080',
              fontStyle: 'normal',
            }}
          >
            {time !== 0 && isPaused ? 'Reset' : 'Lap'}
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: 100,
            height: 40,
            backgroundColor:
              time === 0 ? '#9ac3fd' : isPaused ? '#9ac3fd' : 'red',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}
          onPress={() => {
            handleStart()
          }}
        >
          <Text style={{ color: '#fff', fontStyle: 'normal' }}>
            {time === 0 ? 'Start' : isPaused ? 'Resume' : 'Stop'}
          </Text>
        </Pressable>
      </View>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',

    paddingTop: 32,

    backgroundColor: '#fff',
  },

  timer: {
    fontSize: 80,
    marginBottom: 32,
  },

  lapsHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: '80%',
  },

  lapsHeaderText: {
    fontWeight: '700',
  },

  laps: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
  },

  buttons: {
    position: 'absolute',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',

    gap: 50,
    bottom: 24,
  },
})
