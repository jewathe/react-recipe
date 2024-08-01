class RecipeModel {
    id: string;
    title: string;
    description?: string;
    category?: string;
    img?: string;
    available?: boolean;
    constructor(id: string, title: string, description: string, category: string, img: string, available: boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.img = img;
        this.available = available;
    }
}
export default RecipeModel;