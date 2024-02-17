import FoodRes from "./FoodRes";
import MealRes from "./MealRes";
import MenuRes from "./MenuRes";

interface DayDetail { 
    day: number,
    meals: MealDetail[]
}

interface MealDetail { 
    meal: MealRes,
    foods: FoodRes[]
}

export interface DetailMenuItem { 
    idMeal: number,
    day: number,
    idFood: number,
    nameFood: string,
}

export default interface DetailMenuRes { 
    menu: MenuRes,
    //items: DayDetail[]
    items: DetailMenuItem[]
}