export interface clubState {
    clubCategories: clubCategories []
    clubCategoryLoading: boolean;
    showVerifyModal: boolean;
    showBrowseModal: boolean;
    location: {
        id: string;
        name: string;
    }
}

export interface clubCategories {
    category: string;
    slug: string;
}