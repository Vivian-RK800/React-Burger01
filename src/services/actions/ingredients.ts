import { Dispatch, createAction } from "@reduxjs/toolkit";
import getIngredientsApi from "../../api/get-ingredients";
import { ERROR } from "./error";
import { IIngredient } from "../../models/ingredient";

export const GET_INGREDIENTS = createAction("ingredients/request");
export const GET_INGREDIENTS_SUCCESS = createAction<IIngredient[]>(
  "ingredients/request/success"
);
export const GET_INGREDIENTS_ERROR = createAction<void>(
  "ingredients/request/error"
);

export const getIngredients = () => (dispatch: Dispatch) => {
  dispatch(GET_INGREDIENTS());
  getIngredientsApi()
    .then((items) => {
      dispatch(GET_INGREDIENTS_SUCCESS(items));
    })
    .catch((err: string) => {
      dispatch(GET_INGREDIENTS_ERROR());
      dispatch(ERROR(err));
    });
};

export type TIngredientsActions = ReturnType<
  | typeof GET_INGREDIENTS
  | typeof GET_INGREDIENTS_SUCCESS
  | typeof GET_INGREDIENTS_ERROR
>;
