
export default interface Province { 
    id: string,
    name: string,
    districts: District[]
}

export interface District { 
    id: string,
    name: string,
    wards: Ward[]
}

export interface Ward { 
    id: string,
    name: string,
}