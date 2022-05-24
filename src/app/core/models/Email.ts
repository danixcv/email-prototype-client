import { Provider } from "./Provider";

export interface Email {
    id?: string;
    name?: string;
    watchedFolder?: string;
    provider?: Provider;
    storeAttachments: boolean;
}
