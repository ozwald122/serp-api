import OrganicResult from "./OrganicResult";
import SearchInformation from "./SearchInformation";

export interface Response<T> {
    data: T,
    success: boolean,
    message?: string
}

export interface SearchResponse {
    search_information: SearchInformation,
    organic_results: OrganicResult[],
}
