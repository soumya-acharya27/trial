import { Club } from "./clubinterface";

export interface Event {
    description: string;
    domain: string;
    endDateTime: string;
    id: string;
    imageId: string;
    isDeleted: boolean;
    isRegistered: boolean;
    isRegistrationOpen: boolean;
    mode: string;
    name: string;
    scheduleTime: string;
    startDateTime: string;
    status: string;
    totalMembers: number;
    clubs: Club[];
}

export interface EventsSection {
    hasMore: boolean;
    events: Event[];
}

export interface Location {
    id: string;
    name: string;
}

export interface GetEventsPageData {
    getEventsPage: {
        trending: EventsSection;
        upcoming: EventsSection;
        location: Location;
    };
}

export interface GetEventsPageVars {
    input: {
        limit: number;
        page: number;
        regionId: string;
    };
}

export interface GetEventsData {
    getEvents: EventsSection;
}

export interface GetEventsVars {
    input: {
        regionId?: string;
        mode?: 'VIRTUAL' | 'OFFLINE';
        status?: 'UPCOMING' | 'TRENDING';
        trending?: boolean;
        search?: string;
        start?: string;
        end?: string;
        dateRange?: string;
        clubId?: string;
        limit: number;
        page: number;
    };
}

export interface GetLocationsData {
    getLocations: {
        locations: Location[];
    };
}

export interface GetLocationsVars {
    input: {
        limit: number;
        page: number;
        search: string;
    };
}

export interface EventDetailsResponse {
    getEventDetails: {
      isRegistered: boolean;
      qrCode?: string;
      description: string;
      endDateTime: string;
      id: string;
      imageId: string;
      isDeleted: boolean;
      scheduleTime: string;
      startDateTime: string;
      name: string;
      domain: string;
      totalMembers: number;
      mode: string;
      isRegistrationOpen: boolean;
      status: string;
      clubs: Club[]
    };
  } 

  export interface RegisterForEventInput {
    eventId: string;
  }
  
  export interface RegisterForEventResponse {
    registerForEvent: {
      eventId: string;
      id: string;
      isCheckedIn: boolean;
      isUsed: boolean;
      qrCode: string;
      registeredBy: string;
    };
  }

  export interface GetUserRegisteredEventsData {
    getUserRegisteredEvents: {
      hasMore: boolean;
      events: Event[];
    };
  }
  
  export interface GetUserRegisteredEventsVars {
    input: {
      limit: number;
      page: number;
    };
  }