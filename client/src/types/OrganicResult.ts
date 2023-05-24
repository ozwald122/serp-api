export default interface OrganicResult {
    position: number;
    title: string;
    link: string;
    displayed_link: string;
    snippet: string;
    snippet_highlighted_words: string[];
    rich_snippet?: {
        top?: {
            detected_extensions?: {
                price: number;
                currency: string;
                unknown: number;
            };
            extensions: string[];
        };
    };
    about_this_result: {
        keywords: string[];
        languages: string[];
        regions: string[];
    };
    source: string
}
