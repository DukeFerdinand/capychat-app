import SensitiveInfo from "react-native-sensitive-info";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SensitiveInfoOptions {
    sharedPreferencesName?: string;
    keychainService?: string;
}

export class CapyStorage {
    private readonly storeName: string;
    private readonly sensitiveOptions: SensitiveInfoOptions;

    private storage = AsyncStorage;
    private sensitiveStorage = SensitiveInfo;

    constructor(storeName: string) {
        this.storeName = storeName;
        this.sensitiveOptions = {
            sharedPreferencesName: storeName,
            keychainService: storeName,
        };
    }

    async store(key: string, value: string): Promise<void> {
        await this.storage.setItem(`${this.storeName}:${key}`, value);
    }

    async get(key: string): Promise<string | null> {
        return await this.storage.getItem(`${this.storeName}:${key}`);
    }

    async storeSensitive(key: string, value: string): Promise<void> {
        await this.sensitiveStorage.setItem(key, value, this.sensitiveOptions);
    }

    async getSensitive(key: string): Promise<string | null> {
        return await this.sensitiveStorage.getItem(key, this.sensitiveOptions);
    }
}
