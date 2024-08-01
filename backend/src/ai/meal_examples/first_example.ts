export const firstExample = `First example:
The user: Female, 23 years old. Diets: no special diet. Goals: Eat healthy. Health conditions: migranes. Extra information: Eats kosher, doesn't like nuts and beans.\n
The result planner:
{
    "Sunday": {
        "Breakfast": {
            "name": "Greek Yogurt with Berries and Honey",
            "ingredients": [
                { "name": "Greek yogurt", "quantity": "1 cup" },
                { "name": "Mixed berries", "quantity": "1/2 cup" },
                { "name": "Honey", "quantity": "1 tablespoon" },
                { "name": "Chia seeds", "quantity": "1 tablespoon", "comments": "optional" }
            ],
            "instructions": [
                "Scoop Greek yogurt into a bowl.",
                "Top with mixed berries.",
                "Drizzle honey over the top.",
                "Sprinkle chia seeds if desired."
            ]
        },
        "Lunch": {
            "name": "Quinoa Salad with Grilled Chicken",
            "ingredients": [
                { "name": "Quinoa", "quantity": "1 cup", "comments": "cooked" },
                { "name": "chicken breast", "quantity": "1", "comments": "grilled, sliced" },
                { "name": "Cherry tomatoes", "quantity": "1/2 cup", "comments": "halved" },
                { "name": "Cucumber", "quantity": "1/4 cup", "comments": "diced" },
                { "name": "Feta cheese", "quantity": "2 tablespoons" },
                { "name": "Olive oil", "quantity": "1 tablespoon" },
                { "name": "Lemon juice", "quantity": "1 tablespoon" },
                { "name": "Salt and pepper", "comments": "to taste" }
            ],
            "instructions": [
                "In a large bowl, combine cooked quinoa, cherry tomatoes, cucumber, and feta cheese.",
                "Add sliced grilled chicken on top.",
                "Drizzle with olive oil and lemon juice.",
                "Season with salt and pepper.",
                "Toss to combine."
            ]
        },
        "Dinner": {
            "name": "Baked Salmon with Steamed Broccoli",
            "ingredients": [
                { "name": "Salmon fillet", "quantity": "1" },
                { "name": "Olive oil", "quantity": "1 tablespoon" },
                { "name": "Lemon juice", "quantity": "1 teaspoon" },
                { "name": "dill", "quantity": "1 teaspoon", "comments": "dried" },
                { "name": "Salt and pepper", "comments": "to taste" },
                { "name": "Broccoli florets", "quantity": "1 cup" }
            ],
            "instructions": [
                "Preheat oven to 375°F (190°C).",
                "Place salmon fillet on a baking sheet lined with parchment paper.",
                "Brush with olive oil and lemon juice.",
                "Season with dried dill, salt, and pepper.",
                "Bake for 15-20 minutes until salmon is cooked through.",
                "Steam broccoli until tender."
            ]
        }
    },
    "Monday": {
        "Breakfast": {
            "name": "Smoothie Bowl",
            "ingredients": [
                { "name": "Banana", "quantity": "1" },
                { "name": "berries", "quantity": "1/2 cup", "comments": "frozen" },
                { "name": "Almond milk", "quantity": "1/2 cup" },
                { "name": "Honey", "quantity": "1 tablespoon" },
                { "name": "Granola", "quantity": "1/4 cup" }
            ],
            "instructions": [
                "Blend banana, frozen berries, almond milk, and honey until smooth.",
                "Pour into a bowl.",
                "Top with granola."
            ]
        },
        "Lunch": {
            "name": "Chicken and Veggie Stir-Fry",
            "ingredients": [
                { "name": "Chicken breast", "quantity": "1", "comments": "cubed" },
                { "name": "Bell pepper", "quantity": "1", "comments": "sliced" },
                { "name": "Snap peas", "quantity": "1 cup" },
                { "name": "Carrots", "quantity": "1/2 cup", "comments": "sliced" },
                { "name": "Soy sauce", "quantity": "2 tablespoons" },
                { "name": "Olive oil", "quantity": "1 tablespoon" }
            ],
            "instructions": [
                "Heat olive oil in a pan over medium heat.",
                "Add chicken and cook until browned.",
                "Add bell pepper, snap peas, and carrots. Stir-fry until vegetables are tender.",
                "Add soy sauce and cook for another 2 minutes."
            ]
        },
        "Dinner": {
            "name": "Turkey Meatballs with Spaghetti Squash",
            "ingredients": [
                { "name": "turkey", "quantity": "1 pound", "comments": "ground" },
                { "name": "Egg", "quantity": "1" },
                { "name": "Breadcrumbs", "quantity": "1/4 cup" },
                { "name": "Parmesan cheese", "quantity": "1/4 cup", "comments": "grated" },
                { "name": "oregano", "quantity": "1 teaspoon", "comments": "dried" },
                { "name": "Spaghetti squash", "quantity": "1" },
                { "name": "Marinara sauce", "quantity": "1 cup" }
            ],
            "instructions": [
                "Preheat oven to 375°F (190°C).",
                "Mix ground turkey, egg, breadcrumbs, Parmesan, and oregano. Form into meatballs and place on a baking sheet.",
                "Bake for 20 minutes.",
                "Cut spaghetti squash in half and remove seeds. Bake cut side down for 40 minutes.",
                "Scrape the squash to create 'noodles' and top with meatballs and marinara sauce."
            ]
        }
    },
    "Tuesday": {
        "Breakfast": {
            "name": "Avocado Toast",
            "ingredients": [
                { "name": "Whole-grain bread", "quantity": "1 slice" },
                { "name": "Avocado", "quantity": "1/2", "comments": "mashed" },
                { "name": "Lemon juice", "quantity": "1 teaspoon" },
                { "name": "Salt and pepper", "comments": "to taste" },
                { "name": "Red pepper flakes", "quantity": "to taste", "comments": "optional" }
            ],
            "instructions": [
                "Toast the bread.",
                "Mash avocado and mix with lemon juice, salt, and pepper.",
                "Spread avocado mixture on the toast.",
                "Sprinkle red pepper flakes if desired."
            ]
        },
        "Lunch": {
            "name": "Lentil Soup",
            "ingredients": [
                { "name": "Lentils", "quantity": "1 cup" },
                { "name": "Onion", "quantity": "1", "comments": "chopped" },
                { "name": "Carrots", "quantity": "2", "comments": "diced" },
                { "name": "Celery stalks", "quantity": "2", "comments": "diced" },
                { "name": "Vegetable broth", "quantity": "4 cups" },
                { "name": "Cumin", "quantity": "1 teaspoon" },
                { "name": "Paprika", "quantity": "1 teaspoon" }
            ],
            "instructions": [
                "Sauté onion, carrots, and celery in a pot with a little olive oil until soft.",
                "Add lentils, vegetable broth, cumin, and paprika.",
                "Bring to a boil, then simmer for 30 minutes until lentils are tender."
            ]
        },
        "Dinner": {
            "name": "Chicken Caesar Salad",
            "ingredients": [
                { "name": "chicken breast", "quantity": "1", "comments": "grilled, sliced" },
                { "name": "Romaine lettuce", "quantity": "2 cups", "comments": "chopped" },
                { "name": "Caesar dressing", "quantity": "1/4 cup" },
                { "name": "Parmesan cheese", "quantity": "2 tablespoons" },
                { "name": "Croutons", "quantity": "to taste", "comments": "optional" }
            ],
            "instructions": [
                "Toss lettuce with Caesar dressing.",
                "Top with sliced grilled chicken.",
                "Sprinkle Parmesan cheese and croutons if desired."
            ]
        }
    },
    "Wednesday": {
        "Breakfast": {
            "name": "Oatmeal with Fresh Fruit",
            "ingredients": [
                { "name": "oats", "quantity": "1/2 cup", "comments": "rolled" },
                { "name": "Almond milk", "quantity": "1 cup" },
                { "name": "Apple", "quantity": "1/2", "comments": "diced" },
                { "name": "Cinnamon", "quantity": "1/2 teaspoon" },
                { "name": "Maple syrup", "quantity": "1 tablespoon" }
            ],
            "instructions": [
                "Combine oats and almond milk in a pot and cook over medium heat until thickened.",
                "Stir in diced apple, cinnamon, and maple syrup."
            ]
        },
        "Lunch": {
            "name": "Veggie Wrap",
            "ingredients": [
                { "name": "Whole-wheat tortilla", "quantity": "1" },
                { "name": "Hummus", "quantity": "1/4 cup" },
                { "name": "Avocado", "quantity": "1/2", "comments": "sliced" },
                { "name": "carrots", "quantity": "1/2 cup", "comments": "shredded" },
                { "name": "Spinach leaves", "quantity": "1/2 cup" }
            ],
            "instructions": [
                "Spread hummus over the tortilla.",
                "Layer with avocado, shredded carrots, and spinach.",
                "Roll up tightly and cut in half."
            ]
        },
        "Dinner": {
            "name": "Stuffed Bell Peppers",
            "ingredients": [
                { "name": "Bell peppers", "quantity": "2", "comments": "tops cut off and seeds removed" },
                { "name": "Brown rice", "quantity": "1 cup", "comments": "cooked" },
                { "name": "Black beans", "quantity": "1/2 cup" },
                { "name": "Corn", "quantity": "1/2 cup" },
                { "name": "cheese", "quantity": "1/2 cup", "comments": "shredded" }
            ],
            "instructions": [
                "Preheat oven to 375°F (190°C).",
                "Cut tops off bell peppers and remove seeds.",
                "Mix rice, beans, corn, and half of the cheese.",
                "Stuff peppers with the mixture and top with remaining cheese.",
                "Bake for 25-30 minutes."
            ]
        }
    },
    "Thursday": {
        "Breakfast": {
            "name": "Chia Seed Pudding",
            "ingredients": [
                { "name": "Chia seeds", "quantity": "1/4 cup" },
                { "name": "Almond milk", "quantity": "1 cup" },
                { "name": "Maple syrup", "quantity": "1 tablespoon" },
                { "name": "fruit", "quantity": "as desired", "comments": "fresh, for topping" }
            ],
            "instructions": [
                "Mix chia seeds, almond milk, and maple syrup in a bowl.",
                "Refrigerate overnight or at least 4 hours.",
                "Top with fresh fruit before serving."
            ]
        },
        "Lunch": {
            "name": "Turkey and Avocado Salad",
            "ingredients": [
                { "name": "Mixed greens", "quantity": "1 cup" },
                { "name": "Avocado", "quantity": "1/2", "comments": "sliced" },
                { "name": "Turkey breast", "quantity": "1/2 cup", "comments": "sliced" },
                { "name": "Cherry tomatoes", "quantity": "1/4 cup", "comments": "halved" },
                { "name": "Balsamic vinaigrette", "quantity": "1 tablespoon" }
            ],
            "instructions": [
                "Toss mixed greens with balsamic vinaigrette.",
                "Top with avocado, turkey, and cherry tomatoes."
            ]
        },
        "Dinner": {
            "name": "Baked Tilapia with Asparagus",
            "ingredients": [
                { "name": "Tilapia fillet", "quantity": "1" },
                { "name": "Olive oil", "quantity": "1 tablespoon" },
                { "name": "Lemon", "quantity": "1", "comments": "sliced" },
                { "name": "thyme", "quantity": "1 teaspoon", "comments": "dried" },
                { "name": "Asparagus spears", "quantity": "1 cup" }
            ],
            "instructions": [
                "Preheat oven to 375°F (190°C).",
                "Place tilapia on a baking sheet.",
                "Drizzle with olive oil and top with lemon slices and thyme.",
                "Bake for 15-20 minutes.",
                "Toss asparagus with a little olive oil and roast alongside tilapia."
            ]
        }
    },
    "Friday": {
        "Breakfast": {
            "name": "Berry Smoothie",
            "ingredients": [
                { "name": "mixed berries", "quantity": "1/2 cup", "comments": "frozen" },
                { "name": "Banana", "quantity": "1/2" },
                { "name": "Spinach", "quantity": "1 cup" },
                { "name": "Almond milk", "quantity": "1 cup" },
                { "name": "Flaxseeds", "quantity": "1 tablespoon" }
            ],
            "instructions": [
                "Blend all ingredients until smooth."
            ]
        },
        "Lunch": {
            "name": "Grilled Veggie Sandwich",
            "ingredients": [
                { "name": "Whole-grain bread", "quantity": "2 slices" },
                { "name": "Hummus", "quantity": "1/4 cup" },
                { "name": "zucchini and bell peppers", "quantity": "1/2 cup", "comments": "grilled" },
                { "name": "mozzarella cheese", "quantity": "1/4 cup", "comments": "shredded" }
            ],
            "instructions": [
                "Spread hummus on bread slices.",
                "Layer with grilled veggies and cheese.",
                "Grill or toast until cheese is melted."
            ]
        },
        "Dinner": {
            "name": "Chicken and Vegetable Skewers",
            "ingredients": [
                { "name": "Chicken breast", "quantity": "1 pound", "comments": "cubed" },
                { "name": "Red bell pepper", "quantity": "1", "comments": "cut into chunks" },
                { "name": "Green bell pepper", "quantity": "1", "comments": "cut into chunks" },
                { "name": "Cherry tomatoes", "quantity": "1 cup" },
                { "name": "Olive oil", "quantity": "2 tablespoons" },
                { "name": "basil", "quantity": "1 teaspoon", "comments": "dried" },
                { "name": "Salt and pepper", "comments": "to taste" }
            ],
            "instructions": [
                "Preheat grill to medium-high heat.",
                "Thread chicken and vegetables onto skewers.",
                "Brush with olive oil and season with basil, salt, and pepper.",
                "Grill for 10-15 minutes, turning occasionally."
            ]
        }
    },
    "Saturday": {
        "Breakfast": {
            "name": "Banana Pancakes",
            "ingredients": [
                { "name": "Banana", "quantity": "1" },
                { "name": "Egg", "quantity": "1" },
                { "name": "Flour", "quantity": "1/4 cup" },
                { "name": "Baking powder", "quantity": "1/4 teaspoon" },
                { "name": "Vanilla extract", "quantity": "1/4 teaspoon" },
                { "name": "Oil", "quantity": "1 tablespoon", "comments": "for cooking" }
            ],
            "instructions": [
                "Mash banana and mix with egg, flour, baking powder, and vanilla.",
                "Heat oil in a pan over medium heat.",
                "Pour batter into pan to form pancakes.",
                "Cook until bubbles form, then flip and cook until golden brown."
            ]
        },
        "Lunch": {
            "name": "Spinach and Feta Stuffed Chicken",
            "ingredients": [
                { "name": "Chicken breast", "quantity": "1" },
                { "name": "Spinach", "quantity": "1/2 cup" },
                { "name": "Feta cheese", "quantity": "1/4 cup" },
                { "name": "Olive oil", "quantity": "1 tablespoon" },
                { "name": "Salt and pepper", "comments": "to taste" }
            ],
            "instructions": [
                "Preheat oven to 375°F (190°C).",
                "Stuff chicken breast with spinach and feta.",
                "Secure with toothpicks and season with salt and pepper.",
                "Heat olive oil in a skillet and sear chicken on both sides.",
                "Transfer to oven and bake for 20 minutes."
            ]
        },
        "Dinner": {
            "name": "Zucchini Noodles with Tomato Sauce",
            "ingredients": [
                { "name": "Zucchinis", "quantity": "2", "comments": "spiralized" },
                { "name": "Marinara sauce", "quantity": "1 cup" },
                { "name": "Olive oil", "quantity": "1 tablespoon" },
                { "name": "Parmesan cheese", "quantity": "1/4 cup", "comments": "grated" }
            ],
            "instructions": [
                "Heat olive oil in a pan and sauté zucchini noodles for 3-4 minutes.",
                "Add marinara sauce and cook until heated through.",
                "Top with Parmesan cheese before serving."
            ]
        }
    }
}`
