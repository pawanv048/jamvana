import React, { useState } from 'react'
import { Text, View } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { COLORS } from '../Constants/theme'

// Options data must contain 'item' & 'id' keys

const PRIMARY_ARTIST = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },

  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
]

function Testing() {
  const [selectedTeams, setSelectedTeams] = useState([])
  return (
    <View style={{ margin: 30 }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, paddingBottom: 20 }}>Demos</Text>
      </View>
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Choose Primary Artist</Text>
      <SelectBox
        label="Choose Primary Artist"
        options={PRIMARY_ARTIST}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
        hideInputFilter={false}
        //labelStyle={{ fontSize: 10}}
        //containerStyle={{backgroundColor: '#000'}}
        //inputFilterContainerStyle={{backgroundColor: '#000'}}
        //inputFilterStyle={{fontSize: 21}}
        //optionsLabelStyle={{fontSize: 15}}
        //optionContainerStyle={{backgroundColor: 'red'}}
        multiOptionContainerStyle={{backgroundColor: COLORS.primary}}
        multiOptionsLabelStyle={{fontSize: 12}}
        multiListEmptyLabelStyle={{fontSize: 20}}
        listEmptyLabelStyle={{color: 'red'}}
        selectedItemStyle={{color: 'red'}}
        arrowIconColor={COLORS.primary}
        searchIconColor={COLORS.primary}
        toggleIconColor={COLORS.primary}
        listEmptyText='NO ARTIST FOUND'
      />
    </View>
  )

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }
}

export default Testing





