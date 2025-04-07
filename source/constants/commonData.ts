import uuid from "react-native-uuid";

export const foodOrderData =
{
  "ResponseCode": "Success",
  "ResponseMessage": "",
  "MenuItems": [
    {
      "MealPeriod_Name": "Breakfast",
      "MealPeriod_Id": "MP102",
      "IsSelect": 0,
      "IsEnabled": 1,
      "Time": "06:00 AM - 10:30 AM",
      "Categories": []
    },
    {
      "MealPeriod_Name": "Lunch",
      "MealPeriod_Id": "MP101",
      "IsSelect": 1,
      "IsEnabled": 1,
      "Time": "12:00 PM - 04:30 PM",
      "Categories": [
        {
          "Category_Name": "Appetizers",
          "Category_Id": "C201",
          "IsSelect": 1,
          "Submenu": [
            {
              "Submenu_Name": "Hot",
              "Submenu_Id": "SM401",
              "Items": [
                {
                  "Item_Name": "Spicy Tuna Tacos",
                  "Item_Id": "I401",
                  "Description": "Soft tacos filled with spicy tunakum",
                  "Price": 22.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1,
                  "IsDisable":0,
                  "isModifier": 1
                },
                {
                  "Item_Name": "Chili Cheese Fries",
                  "Item_Id": "I402",
                  "Description": "Crispy fries topped with spicy chili and melted cheese.",
                  "Price": 18.00,
                  "Image": "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
                  "IsAvailable": 1,
                  "isModifier": 0,
                  "IsDisable":0,
                },
                {
                  "Item_Name": "Crispy Chicken Wings",
                  "Item_Id": "I405",
                  "Description": "Crispy fried wings tossed in buffalo sauce, served with ranch.",
                  "Price": 16.00,
                  "Image": "https://www.shutterstock.com/image-photo/grilled-salmon-vegetables-260nw-224518786.jpg",
                  "IsAvailable": 1,
                  "isModifier": 0,
                  "IsDisable":1,
                },
                {
                  "Item_Name": "Mozzarella Sticks",
                  "Item_Id": "I406",
                  "Description": "Breaded mozzarella sticks served with marinara dipping sauce.",
                  "Price": 12.00,
                  "Image": "https://www.shutterstock.com/image-photo/beautiful-food-image-on-table-260nw-2545025947.jpg",
                  "IsAvailable": 1,
                  "isModifier": 1,
                  "IsDisable":0,
                }
              ]
            },
            {
              "Submenu_Name": "Cold",
              "Submenu_Id": "SM402",
              "Items": [
                {
                  "Item_Name": "Cucumber & Avocado Salad",
                  "Item_Id": "I403",
                  "Description": "A refreshing salad of cucumbers, avocado, and a light vinaigrette.",
                  "Price": 14.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2o86IDNmk8t6E2yl-5LPK401pby8B2BX0Vg&s",
                  "IsAvailable": 1,
                  "isModifier": 0,
                  "IsDisable":0,
                },
                {
                  "Item_Name": "Shrimp Cocktail",
                  "Item_Id": "I404",
                  "Description": "Chilled shrimp served with tangy cocktail sauce.",
                  "Price": 20.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2o86IDNmk8t6E2yl-5LPK401pby8B2BX0Vg&s",
                  "isModifier": 0,
                  "IsDisable":0,
                },
                {
                  "Item_Name": "Tuna Tartare",
                  "Item_Id": "I407",
                  "Description": "Fresh tuna marinated with soy sauce, sesame oil, and served with crispy wontons.",
                  "Price": 24.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2OGUKUrsSRGyS5PTcSr1SwZOdze0JA0wFtFVenst8C85CUAUiC3cGTJJwkVHW4sjxXY&usqp=CAU",
                  "IsAvailable": 1,
                  "IsDisable":0,
                },
                {
                  "Item_Name": "Watermelon Feta Salad",
                  "Item_Id": "I408",
                  "Description": "A refreshing mix of watermelon, feta cheese, mint, and a balsamic glaze.",
                  "Price": 16.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEdD1CqS1XYte2SUlSdgMwkSCOVtz1IlNJz0zMokcoH26QIKoJ90tcYvsOOkvG0gc0pUg&usqp=CAU",
                  "IsAvailable": 1,
                  "isModifier": 0,
                  "IsDisable":0,
                }
              ]
            }
          ]
        },
        {
          "Category_Name": "Salads",
          "Category_Id": "C202",
          "IsSelect": 0,
          "Submenu": [
            {
              "Submenu_Name": "Fresh",
              "Submenu_Id": "SM303",
              "Items": [
                {
                  "Item_Name": "Caesar Salad",
                  "Item_Id": "I305",
                  "Description": "A classic Caesar with crisp romaine lettuce.",
                  "Price": 15.00,
                  "Image": "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                  "IsAvailable": 1,
                  "isModifier": 1,
                  "IsDisable":0,
                },
                {
                  "Item_Name": "Greek Salad",
                  "Item_Id": "I306",
                  "Description": "Mixed greens with feta, olives, and dressing.",
                  "Price": 18.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlfJWSz_pT9LgXvU37bHgwIpsmC3HLmIEu60h0nlVTN-MCBC0e9RNEeu-pqE-M9BhmdrY&usqp=CAU",
                  "IsAvailable": 1,
                  "isModifier": 0,
                  "IsDisable":0,
                }
              ]
            },
            {
              "Submenu_Name": "Warm",
              "Submenu_Id": "SM304",
              "Items": [
                {
                  "Item_Name": "Warm Quinoa Salad",
                  "Item_Id": "I307",
                  "Description": "A mix of quinoa, roasted veggies, and a light vinaigrette.",
                  "Price": 20.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpptIUMlnioDZxSpnLnIST_qJAC_Bw9synOLrks2ZYitcUyEUbb5Le7uVDrj5yiYiFWY8&usqp=CAU",
                  "IsAvailable": 1,
                  "isModifier": 0,
                  "IsDisable":0,
                },
                {
                  "Item_Name": "Grilled Chicken Salad",
                  "Item_Id": "I308",
                  "Description": "Grilled chicken, mixed greens, and light dressing.",
                  "Price": 22.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 0,
                  "isModifier": 1,
                  "IsDisable":0,
                }
              ]
            }
          ]
        },
        {
          "Category_Name": "Entrees",
          "Category_Id": "C203",
          "IsSelect": 0,
          "Submenu": [
            {
              "Submenu_Name": "Grilled",
              "Submenu_Id": "SM305",
              "Items": [
                {
                  "Item_Name": "Grilled Chicken Breast",
                  "Item_Id": "I309",
                  "Description": "Tender grilled chicken breast with spices.",
                  "Price": 22.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1,
                  "isModifier": 0,
                  "IsDisable":0,
                },
                {
                  "Item_Name": "Grilled Steak",
                  "Item_Id": "I310",
                  "Description": "Juicy grilled steak, seasoned perfectly.",
                  "Price": 30.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpptIUMlnioDZxSpnLnIST_qJAC_Bw9synOLrks2ZYitcUyEUbb5Le7uVDrj5yiYiFWY8&usqp=CAU",
                  "IsAvailable": 1,
                  "isModifier": 0,
                  "IsDisable":0,
                }
              ]
            },
            {
              "Submenu_Name": "Vegetarian",
              "Submenu_Id": "SM306",
              "Items": [
                {
                  "Item_Name": "Vegetable Stir-Fry",
                  "Item_Id": "I311",
                  "Description": "A medley of vegetables stir-fried in a soy sauce.",
                  "Price": 20.00,
                  "Image": "https://media.gettyimages.com/id/1457889029/photo/group-of-food-with-high-content-of-dietary-fiber-arranged-side-by-side.jpg?s=612x612&w=gi&k=20&c=YiNatAP0CzFSalhnkzSUFyy6XpVhBe3WSnRpu1W3pV4=",
                  "IsAvailable": 1,
                  "isModifier": 0,
                  "IsDisable":0,
                },
                {
                  "Item_Name": "Grilled Tofu",
                  "Item_Id": "I312",
                  "Description": "Grilled tofu served with sautéed vegetables.",
                  "Price": 18.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpptIUMlnioDZxSpnLnIST_qJAC_Bw9synOLrks2ZYitcUyEUbb5Le7uVDrj5yiYiFWY8&usqp=CAU",
                  "IsAvailable": 1,
                  "isModifier": 0,
                  "IsDisable":0,
                }
              ]
            }
          ]
        },
      ]
    },
    {
      "MealPeriod_Name": "Dinner",
      "MealPeriod_Id": "MP103",
      "IsSelect": 0,
      "IsEnabled": 1,
      "Time": "05:00 PM - 09:30 PM",
      "Categories": [
        {
          "Category_Name": "Coconut",
          "Category_Id": "C2013",
          "IsSelect": 1,
          "Submenu": [
            {
              "Submenu_Name": "Normal",
              "Submenu_Id": "SM301",
              "Items": [
                {
                  "Item_Name": "Seared Salmon Salad",
                  "Item_Id": "I301",
                  "Description": "Savor the delicious Green salad.",
                  "Price": 25.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1,
                  "isModifier": 1,
                  "IsDisable":1,
                },
                {
                  "Item_Name": "Coconut Shrimp",
                  "Item_Id": "I302",
                  "Description": "These coconut shrimp are dipped...",
                  "Price": 45.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1,
                  "isModifier": 1,
                  "IsDisable":1,
                }
              ]
            },
            {
              "Submenu_Name": "Cold",
              "Submenu_Id": "SM302",
              "Items": [
                {
                  "Item_Name": "Caprese Salad",
                  "Item_Id": "I303",
                  "Description": "Fresh mozzarella, tomatoes, and basil.",
                  "Price": 18.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 0,
                  "isModifier": 1,
                  "IsDisable":1,
                },
                {
                  "Item_Name": "Guacamole with Chips",
                  "Item_Id": "I304",
                  "Description": "A creamy guacamole served with crispy tortilla chips A creamy guacamole served with crispy tortilla chips A creamy guacamole served with crispy tortilla chips A creamy guacamole served with crispy tortilla chips A creamy guacamole served with crispy tortilla chips.",
                  "Price": 12.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1,
                  "isModifier": 1,
                  "IsDisable":1,
                }
              ]
            }
          ]
        },
      ]
    }
  ]
}

export const newData = [
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-A1CED762E619",
    "Category_Name": "Appateziers 1",
    "CategoryIsSelect": 1,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American one",
    "Item_ID": "669F81D3-8D63-473F-8516-9E1FF6617A51",
    "Item_Name": "JUICE 1",
    "Description": "thid djnfks dsnfkldsn sdfnklsdn dsnfsdklf dsfnkldsn dsnflkdsfsskkssss",
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/view-delicious-dish-food_23-2150777711.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 0,
    "IsDisable": 0 
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-A1CED762E619",
    "Category_Name": "Appateziers 1",
    "CategoryIsSelect": 1,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American two",
    "Item_ID": "669F81D3-8D63-473F-8516-9E1FF6617A52",
    "Item_Name": "JUICE 1",
    "Description": null,
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/view-delicious-dish-food_23-2150777711.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 0,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-A1CED762E619",
    "Category_Name": "Appateziers 1",
    "CategoryIsSelect": 1,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American three",
    "Item_ID": "669F81D3-8D63-473F-8516-9E1FF6617A523",
    "Item_Name": "JUICE 1",
    "Description": null,
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/view-delicious-dish-food_23-2150777711.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 0,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-A1CED762E619",
    "Category_Name": "Appateziers 1",
    "CategoryIsSelect": 1,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American four",
    "Item_ID": "669F81D3-8D63-473F-8516-9E1FF6617A524",
    "Item_Name": "JUICE 1",
    "Description": null,
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/top-view-dishes-with-noodles-tomato-soup_23-2148460189.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 0,
    "IsDisable": 0
  },

  //-----
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-A1CED762E619",
    "Category_Name": "Appateziers 1",
    "CategoryIsSelect": 1,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American five",
    "Item_ID": "669F81D3-8D63-473F-8516-9E1FF6617A525",
    "Item_Name": "JUICE 1",
    "Description": null,
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/top-view-dishes-with-noodles-tomato-soup_23-2148460189.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 0,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-A1CED762E619",
    "Category_Name": "Appateziers 1",
    "CategoryIsSelect": 0,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American cool",
    "Item_ID": "34677E60-E65D-42DD-85EB-E6BE9EC7494949",
    "Item_Name": "Chocolate Chip Cookie Skillet 2",
    "Description": "Warm cookie with ice cream.",
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/top-view-dishes-with-noodles-tomato-soup_23-2148460189.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 1,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-A1CED762E619",
    "Category_Name": "Appateziers 1",
    "CategoryIsSelect": 0,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American number 1",
    "Item_ID": "34677E60-E65D-42DD-85EB-E6BE9EC7585JD8",
    "Item_Name": "Chocolate Chip Cookie Skillet 3",
    "Description": "Warm cookie with ice cream.",
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/delicious-goulash-ready-dinner_23-2149370909.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 1,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-A1CED762090",
    "Category_Name": "Cool 12933",
    "CategoryIsSelect": 0,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American assad",
    "Item_ID": "34677E60-E65D-42DD-85EB-JD393JD",
    "Item_Name": "3 Chocolate Chip Cookie Skillet",
    "Description": "Warm cookie with ice cream.",
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/delicious-goulash-ready-dinner_23-2149370909.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 1,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-94JDNJS33",
    "Category_Name": "Last Ca 5",
    "CategoryIsSelect": 0,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American Classics",
    "Item_ID": "34677E60-E65D-42DD-85EB-JDNNJN4848393",
    "Item_Name": "2 Chocolate Chip Cookie Skillet",
    "Description": "Warm cookie with ice cream.",
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/delicious-goulash-ready-dinner_23-2149370909.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 1,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-94JDNJS33",
    "Category_Name": "Last Ca 5",
    "CategoryIsSelect": 0,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American 6",
    "Item_ID": "34677E60-E65D-42DD-85EB-E6BE9E493749",
    "Item_Name": "2 Chocolate Chip Cookie Skillet",
    "Description": "Warm cookie with ice cream.",
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/delicious-food-table_23-2151902474.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 1,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-94JDNJS33",
    "Category_Name": "Last Ca 5",
    "CategoryIsSelect": 0,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American 0",
    "Item_ID": "34677E60-E65D-42DD-85EB-495303804804",
    "Item_Name": "2 Chocolate Chip Cookie Skillet",
    "Description": "Warm cookie with ice cream.",
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/delicious-food-table_23-2151902474.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 1,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-94JDNJS33",
    "Category_Name": "Last Ca 5",
    "CategoryIsSelect": 0,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American supe",
    "Item_ID": "34677E60-E65D-42DD-85EB-040042783783",
    "Item_Name": "Last 1111",
    "Description": "Warm cookie with ice cream.",
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/delicious-food-table_23-2151902474.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 1,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Lunch",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C3",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 1,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-94JDNJS33",
    "Category_Name": "Last Ca 5",
    "CategoryIsSelect": 0,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644884",
    "SubMenu_Name": "American sgsg",
    "Item_ID": "34677E60-E65D-42DD-85EB-92393493894893JDJDBJ",
    "Item_Name": "Last Ca 5 ttttttt",
    "Description": "Warm cookie with ice cream.",
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/delicious-food-table_23-2151902474.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 1,
    "IsDisable": 0
  },
  {
    "MealPeriod_Name": "Dinner",
    "MealPeriod_Id": "65AD2721-6B6C-4590-BEAE-4BEDD46282C6",
    "Time": "11:00 AM -17:00 PM",
    "MealPeriodIsSelect": 0,
    "IsEnabled": 1,
    "Category_ID": "AF6566DC-D692-4399-892F-A1CED762E613",
    "Category_Name": "Appateziers 4",
    "CategoryIsSelect": 1,
    "SubMenu_ID": "0CC3242A-A9A4-422E-AEE9-1C4A49644810",
    "SubMenu_Name": "American Classics 2",
    "Item_ID": "34677E60-E65D-42DD-85EB484848NDNDKD30303",
    "Item_Name": "1 Chocolate Chip Cookie Skillet",
    "Description": "Warm cookie with ice cream.",
    "Price": 15.00,
    "ImageUrl": "https://img.freepik.com/free-photo/delicious-goulash-stew-table_23-2149371737.jpg?ga=GA1.1.178402553.1739770854&semt=ais_authors_boost",
    "IsAvailable": 1,
    "IsDisable": 0
  }
]

export const ProfitCentersData = {
    "ResponseCode": "Success",
    "ResponseMessage": "",
    "ProfitCenters": [
        {
            "LocationId": "cd123bjdbcjd",
            "LocationName": "Panache",
            "Date": "01/24/2025",
            "OpeningTime": "6:00 AM",
            "ClosingTime": "11:30 AM",
            "Status": "Available",
            "Isnavigate": "1",
            "ImageUrl": "https://t3.ftcdn.net/jpg/02/52/12/40/360_F_252124067_aCtp9ZD934RboKmjJzkXiwYDL7XkNjpn.jpg"
        },
        {
            "LocationId": "cd123bjdbcjd",
            "LocationName": "Living Room",
            "Date": "01/24/2025",
            "OpeningTime": "6:00 AM",
            "ClosingTime": "11:30 AM",
            "Status": "Available",
            "Isnavigate": "1",
            "ImageUrl": "https://t3.ftcdn.net/jpg/02/52/12/40/360_F_252124067_aCtp9ZD934RboKmjJzkXiwYDL7XkNjpn.jpg"
        },
        {
            "LocationId": "cd123bjdbcjd",
            "LocationName": "Grand Central",
            "Date": "01/24/2025",
            "OpeningTime": "11:30 AM",
            "ClosingTime": "5:30 PM",
            "Status": "Available",
            "Isnavigate": "1",
            "ImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJguz-Yat9Wr46Dnevi49thl1jlYCfsYXiUw&s"
        },
        {
            "LocationId": "cd123bjdbcjd",
            "LocationName": "Prime Cut",
            "Date": "01/24/2025",
            "OpeningTime": "5:30 PM",
            "ClosingTime": "10:00 PM",
            "Status": "Closed",
            "Isnavigate": "0",
            "ImageUrl": "https://thumbs.dreamstime.com/b/assorted-indian-food-different-bowls-dark-wooden-background-top-view-dishes-appetizers-cuisine-chicken-curry-rice-129630877.jpg"
        },
        {
            "LocationId": "cd123bjdbcjd",
            "LocationName": "MyPi",
            "Date": "01/24/2025",
            "OpeningTime": "6:00 AM",
            "ClosingTime": "11:30 AM",
            "Status": "Available",
            "Isnavigate": "1",
            "ImageUrl": "https://i.pinimg.com/736x/03/d9/d1/03d9d18c3531291c21d864bf8ebdd9fe.jpg"
        },
     

    ]
};

export const RecentordersData={
  "ResponseCode": "Success",
    "ResponseMessage": "",
    "RecentOrders":{
      "PendingOrders" :[
          {
            "OrderDate":"02/01/2025",
            "OrderId": "I304",
            "OrderStatus":"Preparing your order",
            "Pickup_Time":"7:00 PM",
            "Pickup_Location":"Clubhouse Grill",
            "SubTotal":171.00,
            "ServiceCharge":17.10,
            "FoodTax":4.40,
            "StateTax":4.50,
            "Total":197.00,
            "Tip":10.00,
            "GrandTotal":207.00,
            "Items":[
                      { 
                        "ItemName": "Onion Rings",
                        "Item_ID": "I301",
                        "Quantity": 1,
                        "Price": 25.00,
                        "IsAvailable": 1,
                        "IsDisable" : 0,
                        "IsFavorite":0,
                        "comment":"This is the comment give by the user while ordering.",
                        
                    },
                    { 
                      "ItemName": "Coconut Shrimp",
                      "Item_ID": "I302",
                      "Quantity": 1,
                      "Price": 25.00,
                      "IsAvailable": 1,
                      "IsFavorite":0,
                      "comment":"This is the comment give by the user while ordering.",
                      "Modifiers":[
                        {
                          "Item_ID": "I301",
                          "ItemName": "Peanut sauce or sweet soy glaze",             
                        },
                        {
                            "Item_ID": "I301",
                          "ItemName": "Peanut sauce or sweet soy glaze",
                        },

                      ]
                    },

                  ]
                 
      }
    ],
      "CompletedOrders":[
        {
        "HeadingLabel":"Ordered Date",
        "OrderDate":"02/01/2025",
        "OrderId": "I304",
        "IsReorder":1,
        "Items":[
          {
            "CategoryIsSelect": 1,
            "Category_ID": "6B2463D5-F63A-4ACF-B525-A0ECFE433AE3",
            "Category_Name": "Appetizers",
            "Description": "Crispy beer-battered onion rings served with ranch.",
            "ImageUrl": null,
            "IsAvailable": 1,
            "IsDisable": 0,
            "IsEnabled": 1,
            "Item_ID": "11CDDE06-42C4-4CCA-B316-0F2947D1FEAD",
            "Item_Name": "Onion Rings",
            "MealPeriodIsSelect": 1,
            "MealPeriod_Id": "742E383D-EAD7-40DC-8996-9416975385DA",
            "MealPeriod_Name": "Lunch",
            "Price": 4.95,
            "SubMenu_ID": "9DBD30E2-2DF0-4553-BC34-530B2061E60D",
            "SubMenu_Name": "Finger Foods",
            "IsFavorite":1,
            "Time": "06:30 AM -10:30 PM",
            "Modifiers":[
              {
                "Modifier_Id": "I301",
                "Modifier_Name": "Peanut sauce or sweet soy glaze",             
              },
              {
                  "Modifier_Id": "I302",
                "Modifier_Name": "Peanut sauce or sweet soy glaze",
              },
              {
                  "Modifier_Id": "I303",
                "Modifier_Name": "Peanut sauce or sweet soy glaze",
              },
            ]
          },
          {
            "CategoryIsSelect": 1,
            "Category_ID": "6B2463D5-F63A-4ACF-B525-A0ECFE433AE3",
            "Category_Name": "Appetizers",
            "Description": "Crispy shrimp coated with coconut flakes, served with sweet chili.",
            "ImageUrl": null,
            "IsAvailable": 1,
            "IsDisable": 0,
            "IsFavorite":1,
            "IsEnabled": 1,
            "Item_ID": "2159FB2D-FE9C-4F27-BA04-D371F2697277",
            "Item_Name": "Coconut Shrimp",
            "MealPeriodIsSelect": 1,
            "MealPeriod_Id": "742E383D-EAD7-40DC-8996-9416975385DA",
            "MealPeriod_Name": "Lunch",
            "Price": 11.87,
            "SubMenu_ID": "143470EF-EE2A-42D2-A9AE-66063C068B8A",
            "SubMenu_Name": "Seafood Starters",
            "Time": "06:30 AM -10:30 PM",
            "Modifiers": [
              {
                  "Modifier_Id": "0358AAA5-36A2-4BE1-90DD-070A1158D6D1",
                  "Modifier_Name": "Extra Avocado",

              },
              {
                  "Modifier_Id": "0EFB7A36-8B24-40D6-9C3E-A1E9E5423788",
                  "Modifier_Name": "Cheddar Cheese",

              },
              {
                  "Modifier_Id": "843BE6C9-C0E9-4FC0-83CB-CA3CE720926F",
                  "Modifier_Name": "Bacon Strips",

              },
          ],
          },
        ]
      },

    ]
  }
}
export const FavoritesList = {
  "ResponseCode": "Success",
    "ResponseMessage": "",  
  "FavoriteItems":[
  {

    "Item_Name": "Onion Rings",

    "Item_Id": "I302",

    "Description": "These coconut shrimp are dippedabnsmnaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakdddddddddddddddddckidufhnvioefvoieurvoerncvuinuio",

    "Price": 45.00,

    "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexBia36ixX_U4FoPlg0iqv2hZIvfRyeH8LQ&s",

    "IsAvailable": 1,
    "IsFavorite":1

  },
  {

    "Item_Name": "Loaded Potato Skins",

    "Item_Id": "I302",

    "Description": "These coconut shrimp are dipped...",

    "Price": 45.00,

    "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexBia36ixX_U4FoPlg0iqv2hZIvfRyeH8LQ&s",

    "IsAvailable": 1,
    "IsFavorite":1
  },
  {

    "Item_Name": "Crispy Loaded Tater Tots",

    "Item_Id": "I302",

    "Description": "These coconut shrimp are dipped...",

    "Price": 45.00,

    "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexBia36ixX_U4FoPlg0iqv2hZIvfRyeH8LQ&s",

    "IsAvailable": 1,
    "IsFavorite":1

  },

]
}
  export const ModifiersData={
    "ResponseCode": "Success",
      "ResponseMessage": "",
      "Modifiers":[
        {
          "MainModifier":"Sauce",
          "IsRequried":0,
          "IsMaxAllowedOne":0,
          "ModifierItems":[
            {
              "ItemName": "Peanut sauce or sweet soy glaze",            
              "Price": 6.00,            
            },
            {
              "ItemName": "Sweet Chili Sauce",            
              "Price": 3.00,            
            },
            {
              "ItemName": "Add balsamic reductio",            
              "Price": 2.00,            
            },
            {
              "ItemName": "Wasabi or ginger soy sauce",            
              "Price": 2.00,            
            },
          ]
        },
        {
          "MainModifier":"Side",
          "IsRequried":0,
          "IsMaxAllowedOne":1,
          "ModifierItems":[
            {
              "ItemName": "Celery",            
              "Price": 3.00,            
            },
            {
              "ItemName": "Carrots",            
              "Price": 3.00,            
            },
            {
              "ItemName": "Blue Cheese Dressing",            
              "Price": 2.00,            
            },
            {
              "ItemName": "Ranch Dressing",            
              "Price": 2.00,            
            },
          ]
        },
        {
          "MainModifier":"Stuffing Type",
          "IsRequried":1,
          "IsMaxAllowedOne":0,
          "ModifierItems":[
            {
              "ItemName": "Cream Cheese",            
              "Price": 3.00,            
            },
            {
              "ItemName": "Parmesan",            
              "Price": 3.00,            
            },
            {
              "ItemName": "Sausage",            
              "Price": 2.00,            
            },
            {
              "ItemName": "spinach",            
              "Price": 2.00,            
            },
          ]
        },
      ]
  }

export const RecentOrderData = [

  {

    "Item_Name": "Onion Rings",

    "Item_Id": "I302",

    "Description": "These coconut shrimp are dipped...",

    "Price": 45.00,

    "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexBia36ixX_U4FoPlg0iqv2hZIvfRyeH8LQ&s",

    "IsAvailable": 1

  },
  {

    "Item_Name": "Loaded Potato Skins",

    "Item_Id": "I302",

    "Description": "These coconut shrimp are dipped...",

    "Price": 45.00,

    "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexBia36ixX_U4FoPlg0iqv2hZIvfRyeH8LQ&s",

    "IsAvailable": 1

  },
  {

    "Item_Name": "Crispy Loaded Tater Tots",

    "Item_Id": "I302",

    "Description": "These coconut shrimp are dipped...",

    "Price": 45.00,

    "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexBia36ixX_U4FoPlg0iqv2hZIvfRyeH8LQ&s",

    "IsAvailable": 1

  },
  {

    "Item_Name": "Mozzarella Sticks",

    "Item_Id": "I302",

    "Description": "These coconut shrimp are dipped...",

    "Price": 45.00,

    "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexBia36ixX_U4FoPlg0iqv2hZIvfRyeH8LQ&s",

    "IsAvailable": 1

  },

]

export const additionalTipData = [
  {
    id:uuid.v4(),
    tip: 10,
    isSelected:0
  },
  {
    id:uuid.v4(),
    tip: 20,
    isSelected:0
  },
  {
    id:uuid.v4(),
    tip: 30,
    isSelected:0
  }
]

export const priceItems = [
  { label: "Sub Total:", value: "$171.00" },
  { label: "10% Service Charge:", value: "$17.10" },
  { label: "State Tax:", value: "$8.50" },
  { label: "Tip:", value: "$10.00" }
];

export const cartConfigResponseData = { 
  "ResponseCode": "Success", 
  "ResponseMessage": "", 
  "ShowPickupLocation": 1, 
  "ShowPickupTime": 1, 
  "ShowTip": 1, 
  "Servicetax":"10 %", 
  "Pickup_Locations": [ 
    { 
      "Pickup_LocationId": "sjcjdc1bjdbcj2324nn", 
      "Pickup_LocationName": "East Gate" 
    },
    { 
      "Pickup_LocationId": "sjcjdc1bjdbcj2324nn", 
      "Pickup_LocationName": "South Gate" 
    } 
  ], 
  "Pickup_Times": [ 
    { 
      "Time": "08:00 AM" 
    }, 
    { 
      "Time": "08:30 AM" 
    }, 
    { 
      "Time": "09:00 AM" 
    }, 
    { 
      "Time": "09:30 AM" 
    }, 
    { 
      "Time": "10:00 AM" 
    }, 
    { 
      "Time": "10:30 AM" 
    }, 
    { 
      "Time": "11:00 AM" 
    } 
  ], 

  "Tip": [ 
    { "tip": "10%" }, 
    { "tip": "15%" }, 
    { "tip": "20%" } 
  ] 

} 

export const departments =[
  {
    "label": "08:00 AM",
    "value": "08:00 AM"
  },
  {
    "label": "08:30 AM",
    "value": "08:30 AM"
  },
  {
    "label": "09:00 AM",
    "value": "09:00 AM"
  },
  {
    "label": "09:30 AM",
    "value": "09:30 AM"
  },
  {
    "label": "10:00 AM",
    "value": "10:00 AM"
  },
  {
    "label": "10:30 AM",
    "value": "10:30 AM"
  },
  {
    "label": "11:00 AM",
    "value": "11:00 AM"
  },
  {
    "label": "08:00 AM",
    "value": "08:00 AM"
  },
  {
    "label": "08:30 AM",
    "value": "08:30 AM"
  },
  {
    "label": "09:00 AM",
    "value": "09:00 AM"
  },
  {
    "label": "09:30 AM",
    "value": "09:30 AM"
  },
  {
    "label": "10:00 AM",
    "value": "10:00 AM"
  },
  {
    "label": "10:30 AM",
    "value": "10:30 AM"
  },
  {
    "label": "11:00 AM",
    "value": "11:00 AM"
  }
];

export const pickupLocations = [
  {
    "label": "IT Department",
    "value": "IT Department"
  },
  {
    "label": "HR Department",
    "value": "HR Department"
  },
  {
    "label": "Finance Department",
    "value": "Finance Department"
  },
  {
    "label": "Logistics Department",
    "value": "Logistics Department"
  },
  {
    "label": "Security Office",
    "value": "Security Office"
  },
  {
    "label": "Main Reception",
    "value": "Main Reception"
  },
  {
    "label": "R&D Center",
    "value": "R&D Center"
  },
  {
    "label": "Customer Support",
    "value": "Customer Support"
  },
  {
    "label": "Warehouse A",
    "value": "Warehouse A"
  },
  {
    "label": "Warehouse B",
    "value": "Warehouse B"
  },
  {
    "label": "Cafeteria",
    "value": "Cafeteria"
  },
  {
    "label": "Parking Lot",
    "value": "Parking Lot"
  },
  {
    "label": "Training Room",
    "value": "Training Room"
  },
  {
    "label": "Server Room",
    "value": "Server Room"
  }
];