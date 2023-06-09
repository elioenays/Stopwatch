import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface Laps {
  minutes: string
  seconds: string
  miliseconds: string
}

export default function App() {
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  const [laps, setLaps] = useState<Laps[]>([])

  useEffect(() => {
    let interval: NodeJS.Timer

    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100)
      }, 100)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isPaused])

  const handleStart = () => {
    if (isPaused) {
      setIsPaused(false)
    } else {
      setIsPaused(true)
    }
  }

  const handleReset = () => {
    if (isPaused) {
      setTime(0)
      setLaps([])
    } else {
      laps.unshift({
        miliseconds: ('0' + Math.floor(time / 10)).slice(-2, -1),
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
        {('0' + Math.floor(time / 10)).slice(-2, -1)}
      </Text>

      <View style={styles.lapsHeader}>
        <Text style={styles.lapsHeaderText}>Lap</Text>
        <Text style={styles.lapsHeaderText}>Lap times</Text>
      </View>

      {laps.map((lap, index) => (
        <View
          key={index}
          style={styles.laps}
        >
          <Text>{index}</Text>
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
          disabled={time ? false : true}
        >
          <Text
            style={{
              color: time ? '#000' : '#808080',
              fontStyle: 'normal',
              fontWeight: '600',
            }}
          >
            {time && isPaused ? 'Reset' : 'Lap'}
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: 100,
            height: 40,
            backgroundColor: !time ? '#9ac3fd' : isPaused ? '#9ac3fd' : 'red',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}
          onPress={() => {
            handleStart()
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>
            {!time ? 'Start' : isPaused ? 'Resume' : 'Stop'}
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
