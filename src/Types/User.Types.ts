import type { ThemeTypes } from "./Global.Types";
import type { LanguageTypes } from "./Settings.Types";



export interface UserStoreProps {
    user: string;           
    token: string;          
    email?: string;        
    createdAt?: Date;
    isLogin: boolean;
    isPremium: boolean;     
    remainingGames: number;
    subscriptionExpires?: Date; 
    avatarUrl?: string;            
    preferences?: {
        theme?: ThemeTypes;  
        language?: LanguageTypes;
    };
    dataStorage?: any;
}
