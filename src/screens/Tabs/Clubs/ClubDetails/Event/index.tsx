import { View, Text, Pressable, SafeAreaView, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import MemberList from '../../../../../component/MemberList'
import EventsList from '../../../../../component/EventsList'
import { Event } from '../../../../../interface/eventinterface'

interface EventsParams {
    loading: boolean,
    page: number;
    events: Event[]
    handleLoadMore: () => void
}

const Events = ({loading, page, events, handleLoadMore}: EventsParams) => {
    const renderCard = useCallback(
        ({ item, index }: { item: Event, index: number }) => (
            <EventsList
                data={item}
                SelectedValue={(item) => {
                }} />
        ),
        [],
    );

    return (
        <View style={styles.container}>
            {loading && page === 1 ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color="#FFFFFF" />
                    </View>
                  ) : (
                    <FlatList
                      data={events ?? []}
                      renderItem={renderCard}
                      keyExtractor={(item) => item.id}
                      numColumns={1}
                      showsVerticalScrollIndicator={false}
                      onEndReached={handleLoadMore}
                      onEndReachedThreshold={0.5}
                      ListFooterComponent={
                        loading && page > 1 ? (
                          <View style={styles.footerLoader}>
                            <ActivityIndicator size="small" color="#FFFFFF" />
                          </View>
                        ) : null
                      }
                    />
                  )}

        </View>
    )

}

export default Events
