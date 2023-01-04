import { type } from "os";

interface Evolution  {
    id: string,
    name: string
}

interface Pokemon  {
    id: string,
    name: string,
    image_url: string,
    evolutions: Evolution[],
    description: string,
    types: string[],
    isActive: boolean
};

export type{Pokemon , Evolution}