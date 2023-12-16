import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getItem, setItem, wordsArray } from "../utils";
import { UserGoogle, UserInstagram, UserProfileInterface } from "../Types";
import Screen from "../assets/images/screenshot3.png";
import Screen2 from "../assets/images/screenshot1.png";
import Screen3 from "../assets/images/screenshot2.png";
import Screen4 from "../assets/images/screenshot4.png";
const arrayMessages = Array.from({ length: 4 }, (_, index) =>
  (index + 1).toString().concat(" ч.")
).concat(
  Array.from({ length: 4 }, (_, index) => (index + 1).toString().concat(" д."))
);
export interface carouselInterface<T> {
  image: boolean;
  images: T;
}
let googleUser: UserGoogle = {
  displayName: null,
  email: null,
  photoURL: null,
  password: null,
};
type GenericsStore<T> = T | null;
export interface InitialStateInterface {
  siteColor: GenericsStore<string>;
  loader: boolean;
  token: GenericsStore<string>;
  user: UserInstagram | null;
  carouselImges: carouselInterface<string[]>;
  idx: number;
  googleUser: UserGoogle;
  mainProfile: GenericsStore<UserProfileInterface>;
  searchBox: boolean;
  following: GenericsStore<UserProfileInterface[]>;
  notifications: boolean;
  followers: UserProfileInterface[];
  messages: boolean;
  dateMessagesArray: GenericsStore<string[]>;
  wordsMessageArray: GenericsStore<string[]>;
}
const initialState: InitialStateInterface = {
  loader: true,
  token: getItem("instagram-token") ? getItem("instagram-token") : null,
  siteColor:
    getItem("instagram-token") && getItem("instagram-color")
      ? getItem("instagram-color")
      : null,
  user: getItem("instagram-user")
    ? JSON.parse(getItem("instagram-user")!)
    : null,
  carouselImges: {
    image: true,
    images: [Screen, Screen2, Screen3, Screen4],
  },
  idx: 0,
  googleUser,
  mainProfile: null,
  searchBox: false,
  following: [],
  notifications: false,
  followers: [],
  messages: false,
  dateMessagesArray: [],
  wordsMessageArray: []
};
export const slice = createSlice({
  name: "instagram",
  initialState,
  reducers: {
    setOpenLoader(state, action: PayloadAction<boolean>) {
      state.loader = action.payload;
    },
    setCloseLoader(state, action: PayloadAction<boolean>) {
      state.loader = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      setItem("instagram-token", state.token);
    },
    setUser(state, action: PayloadAction<UserInstagram>) {
      state.user = action.payload;
      setItem("instagram-user", JSON.stringify(state.user));
    },
    setIncIdx(state, action: PayloadAction<number>) {
      if (state.carouselImges.images.length - 1 > state.idx) {
        state.idx += action.payload;
      } else {
        state.idx = 0;
      }
    },
    setGoogleUser(state, action: PayloadAction<UserGoogle>) {
      state.googleUser = action.payload;
    },
    setInsChangeBg(state, action: PayloadAction<string>) {
      state.siteColor = action.payload;
      setItem("instagram-color", state.siteColor);
    },
    setMainProfile(
      state,
      action: PayloadAction<GenericsStore<UserProfileInterface>>
    ) {
      state.mainProfile = action.payload;
    },
    setSearchBox(state, action: PayloadAction<boolean>) {
      state.searchBox = action.payload;
    },
    setSearchFollowing(state, action: PayloadAction<UserProfileInterface[]>) {
      state.following = action.payload;
    },
    setDelFollower(state, action: PayloadAction<string>) {
      let idx = state.following?.findIndex(
        (item: UserProfileInterface) => item.id === action.payload
      ) as number;
      let followingClone: string = JSON.stringify(state.following);
      let clone: UserProfileInterface[] = JSON.parse(followingClone);
      clone.splice(idx, 1);
      state.following = clone;
    },
    setNotification(state, action: PayloadAction<boolean>) {
      state.notifications = action.payload;
    },
    setFollowers(state, action: PayloadAction<UserProfileInterface[]>) {
      state.followers = action.payload;
    },
    setMessages(state, action: PayloadAction<boolean>) {
      state.messages = action.payload;
    },
    setDateMessagesArray(state, action: PayloadAction<number>) {
      let result: string [] = []
      let array:number[] = Array.from({length: action.payload}, (_, index) => index + 1)
      array?.map(() => {
        let id: string = String(
          arrayMessages[Math.floor(Math.random() * arrayMessages.length)]
        );
          result = [...result, id]
      });
      state.dateMessagesArray = result
    },
    setWordsMessageArray(state, action:PayloadAction<number>){
      state.wordsMessageArray = wordsArray.slice(0, action.payload)
    }
  },
});
export const Reducer = slice.reducer;
export const {
  setToken,
  setUser,
  setIncIdx,
  setOpenLoader,
  setCloseLoader,
  setGoogleUser,
  setInsChangeBg,
  setMainProfile,
  setSearchBox,
  setSearchFollowing,
  setDelFollower,
  setNotification,
  setFollowers,
  setMessages,
  setDateMessagesArray,
  setWordsMessageArray
} = slice.actions;
