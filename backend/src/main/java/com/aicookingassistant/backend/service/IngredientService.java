package com.aicookingassistant.backend.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class IngredientService {

    private final Set<String> MASTER_INGREDIENTS = new HashSet<>();

    public IngredientService() {
        MASTER_INGREDIENTS.addAll(toLowerSet(southIndianIngredients));
        MASTER_INGREDIENTS.addAll(toLowerSet(northIndianIngredients));
        MASTER_INGREDIENTS.addAll(toLowerSet(chineseIngredients));
        MASTER_INGREDIENTS.addAll(toLowerSet(japaneseIngredients));
        MASTER_INGREDIENTS.addAll(toLowerSet(italianIngredients));
        MASTER_INGREDIENTS.addAll(toLowerSet(mexicanIngredients));
        MASTER_INGREDIENTS.addAll(toLowerSet(americanIngredients));
        MASTER_INGREDIENTS.addAll(toLowerSet(frenchIngredients));
        MASTER_INGREDIENTS.addAll(toLowerSet(koreanIngredients));
        MASTER_INGREDIENTS.addAll(toLowerSet(vegetables));
        MASTER_INGREDIENTS.addAll(toLowerSet(fruits));
        MASTER_INGREDIENTS.addAll(toLowerSet(proteins));
        MASTER_INGREDIENTS.addAll(toLowerSet(dairy));
        MASTER_INGREDIENTS.addAll(toLowerSet(grains));
        MASTER_INGREDIENTS.addAll(toLowerSet(spices));
    }

    private Set<String> toLowerSet(List<String> list) {
        Set<String> set = new HashSet<>();
        for (String s : list) {
            set.add(s.toLowerCase());
        }
        return set;
    }

    public List<String> cleanIngredients(List<String> rawIngredients) {

        List<String> cleaned = new ArrayList<>();

        for (String input : rawIngredients) {

            if (input == null) continue;

            String normalized = input.trim().toLowerCase();

            if (normalized.length() < 3) continue;

   
            if (!normalized.matches("^[a-zA-Z ]+$")) continue;

            String corrected = findClosestMatch(normalized);

            if (corrected != null) {
                cleaned.add(corrected);
            }
        }

        return cleaned;
    }
    
    private String findClosestMatch(String input) {

        String closest = null;
        int smallestDistance = Integer.MAX_VALUE;

        for (String word : MASTER_INGREDIENTS) {

            int distance = levenshteinDistance(input, word);

            if (distance < smallestDistance) {
                smallestDistance = distance;
                closest = word;
            }
        }

        if (closest == null) return null;

        int maxLength = Math.max(input.length(), closest.length());

        double similarity = 1.0 - ((double) smallestDistance / maxLength);


        if (smallestDistance <= 2 && similarity >= 0.7) {
            return closest;
        }

        return null;
    }

    private int levenshteinDistance(String a, String b) {

        int[][] dp = new int[a.length() + 1][b.length() + 1];

        for (int i = 0; i <= a.length(); i++) dp[i][0] = i;
        for (int j = 0; j <= b.length(); j++) dp[0][j] = j;

        for (int i = 1; i <= a.length(); i++) {
            for (int j = 1; j <= b.length(); j++) {

                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                            dp[i - 1][j - 1],
                            Math.min(dp[i - 1][j], dp[i][j - 1])
                    );
                }
            }
        }

        return dp[a.length()][b.length()];
    }

     List<String> southIndianIngredients = List.of(
        "rice", "idli rice", "dosa batter", "urad dal", "toor dal",
        "chana dal", "moong dal", "curry leaves", "mustard seeds",
        "cumin seeds", "fenugreek seeds", "tamarind", "coconut",
        "grated coconut", "coconut milk", "sambar powder",
        "rasam powder", "asafoetida", "dry red chilli",
        "green chilli", "ginger", "garlic", "onion", "tomato",
        "drumstick", "brinjal", "okra", "carrot", "beans",
        "cabbage", "potato", "ghee", "sesame oil","chicken","crab",
        "fish","mutton","beef","prawn","octopus","egg"
    );
    List<String> northIndianIngredients = List.of(
        "wheat flour", "maida", "basmati rice", "paneer",
        "cream", "butter", "ghee", "curd", "milk",
        "onion", "tomato", "ginger", "garlic",
        "green chilli", "coriander powder", "cumin powder",
        "garam masala", "turmeric powder", "red chilli powder",
        "kasuri methi", "bay leaf", "cardamom", "cloves",
        "cinnamon", "black pepper", "chickpeas", "rajma",
        "peas", "potato", "cauliflower", "capsicum",
        "spinach", "mint", "coriander"
    );
    List<String> chineseIngredients = List.of(
        "soy sauce", "dark soy sauce", "light soy sauce",
        "oyster sauce", "hoisin sauce", "rice vinegar",
        "sesame oil", "cornstarch", "spring onion",
        "ginger", "garlic", "bok choy", "napa cabbage",
        "shiitake mushroom", "button mushroom", "tofu",
        "egg", "chicken", "pork", "shrimp",
        "noodles", "rice noodles", "fried rice",
        "bean sprouts", "snow peas", "carrot",
        "capsicum", "chilli sauce", "white pepper"
    );
    List<String> japaneseIngredients = List.of(
        "japanese rice", "sushi rice", "nori",
        "soy sauce", "miso paste", "mirin",
        "rice vinegar", "dashi", "wasabi",
        "pickled ginger", "tofu", "tempura flour",
        "panko breadcrumbs", "egg", "salmon",
        "tuna", "shrimp", "chicken", "udon noodles",
        "soba noodles", "ramen noodles", "spring onion",
        "daikon", "shiitake mushroom", "sesame seeds",
        "teriyaki sauce"
    );
    List<String> italianIngredients = List.of(
        "olive oil", "extra virgin olive oil", "garlic",
        "onion", "tomato", "tomato paste", "tomato sauce",
        "basil", "oregano", "thyme", "parsley",
        "mozzarella", "parmesan", "ricotta",
        "butter", "cream", "milk", "egg",
        "spaghetti", "penne", "fusilli", "lasagna sheets",
        "pizza dough", "flour", "yeast",
        "mushroom", "bell pepper", "zucchini",
        "chicken", "shrimp", "black olives"
    );
    List<String> mexicanIngredients = List.of(
        "corn tortilla", "flour tortilla", "taco shells",
        "black beans", "kidney beans", "pinto beans",
        "corn kernels", "avocado", "guacamole",
        "tomato", "onion", "garlic", "jalapeno",
        "chipotle", "cilantro", "lime",
        "mexican rice", "chicken", "beef", "pork",
        "cheddar cheese", "monterey jack",
        "sour cream", "lettuce", "capsicum",
        "cumin powder", "paprika", "oregano",
        "chilli powder", "enchilada sauce", "salsa"
    );
    List<String> americanIngredients = List.of(
        "all purpose flour", "bread flour", "cornmeal",
        "butter", "milk", "cream", "cheddar cheese",
        "mozzarella", "american cheese", "egg",
        "bacon", "ground beef", "chicken breast",
        "turkey", "ham", "hot dog sausage",
        "potato", "sweet potato", "corn kernels",
        "lettuce", "tomato", "onion", "garlic",
        "bell pepper", "mushroom", "pickle",
        "mayonnaise", "mustard", "ketchup",
        "barbecue sauce", "maple syrup",
        "brown sugar", "vanilla extract",
        "peanut butter", "chocolate chips"
    );
    List<String> frenchIngredients = List.of(
        "butter", "unsalted butter", "cream",
        "heavy cream", "milk", "egg",
        "all purpose flour", "bread flour",
        "olive oil", "garlic", "onion",
        "shallots", "leek", "carrot", "celery",
        "mushroom", "potato", "tomato",
        "thyme", "rosemary", "tarragon",
        "parsley", "bay leaf", "dijon mustard",
        "white wine", "red wine", "wine vinegar",
        "gruyere cheese", "brie", "camembert",
        "parmesan", "chicken", "beef", "duck",
        "bacon", "puff pastry"
    );
    List<String> koreanIngredients = List.of(
        "short grain rice", "gochujang",
        "gochugaru", "doenjang", "soy sauce",
        "sesame oil", "sesame seeds",
        "garlic", "ginger", "spring onion",
        "onion", "napa cabbage", "kimchi",
        "daikon radish", "carrot", "zucchini",
        "spinach", "bean sprouts", "tofu",
        "egg", "chicken", "beef", "pork",
        "fish sauce", "rice vinegar",
        "brown sugar", "honey",
        "ramyeon noodles", "sweet potato noodles",
        "perilla leaves", "korean chili paste"
    );
    List<String> vegetables = List.of(
        "onion", "red onion", "spring onion",
        "tomato", "cherry tomato",
        "potato", "sweet potato",
        "carrot", "cabbage", "lettuce",
        "spinach", "kale", "broccoli",
        "cauliflower", "peas", "green peas",
        "corn", "baby corn",
        "capsicum", "bell pepper",
        "zucchini", "cucumber",
        "beetroot", "radish",
        "pumpkin", "bottle gourd",
        "ridge gourd", "brinjal", "eggplant",
        "okra", "mushroom",
        "garlic", "ginger",
        "chilli", "green chilli",
        "jalapeno"
    );
    List<String> fruits = List.of(
        "apple", "banana", "orange",
        "grapes", "mango", "pineapple",
        "papaya", "watermelon",
        "pomegranate", "kiwi",
        "strawberry", "blueberry",
        "blackberry", "pear",
        "peach", "plum",
        "lemon", "lime",
        "avocado"
    );
    List<String> proteins = List.of(
        "chicken", "chicken breast",
        "chicken thigh",
        "mutton", "beef", "pork",
        "fish", "salmon", "tuna",
        "prawn", "shrimp",
        "egg", "boiled egg",
        "paneer", "tofu",
        "soy chunks",
        "chickpeas", "rajma",
        "black beans", "kidney beans",
        "lentils", "dal",
        "moong dal", "toor dal",
        "chana dal"
    );
    List<String> dairy = List.of(
        "milk", "curd", "yogurt",
        "cheese", "cheddar",
        "mozzarella", "parmesan",
        "butter", "ghee",
        "cream", "whipping cream",
        "buttermilk"
    );
    List<String> grains = List.of(
        "rice", "basmati rice",
        "brown rice",
        "flour", "wheat flour",
        "maida", "corn flour",
        "oats", "semolina",
        "bread", "brown bread",
        "noodles", "pasta",
        "spaghetti", "penne",
        "quinoa", "barley",
        "millet", "ragi"
    );
    List<String> spices = List.of(
        "salt", "pepper",
        "turmeric", "cumin",
        "coriander", "garam masala",
        "paprika", "chilli powder",
        "oregano", "thyme",
        "basil", "rosemary",
        "cardamom", "cloves",
        "cinnamon", "bay leaf",
        "mustard seeds",
        "vinegar", "soy sauce",
        "ketchup", "mayonnaise",
        "honey", "sugar"
    );


}