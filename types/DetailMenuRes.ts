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

export default interface DetailMenuRes { 
    menu: MenuRes,
    items: DayDetail[]
}