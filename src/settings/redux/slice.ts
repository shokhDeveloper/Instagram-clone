import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getItem, setItem, wordsArray } from "../utils";
import { CommentProps, FollowersUser, ImageApplication, myMessageInterface, UserGoogle, UserInstagram, UserProfileInterface } from "../Types";
import Screen from "../assets/images/screenshot3.png";
import Screen2 from "../assets/images/screenshot1.png";
import Screen3 from "../assets/images/screenshot2.png";
import Screen4 from "../assets/images/screenshot4.png";
import Xayrulla from "../assets/images/Xayrulla.jpg";
import Messi from "../assets/images/Lionel-Messi-2018.webp";
import Najot from "../assets/images/Najot.jpg";
import Epam from "../assets/images/Epam.jpg";
import Subyektiv from "../assets/images/Subyektiv.jpg";
import Barcelona from "../assets/images/Barcelona.jpg"
import Bill from "../assets/images/Bill.jpg";
import Mark from "../assets/images/Mark.jpg";
import Saud from "../assets/images/Saud.jpg";
import Azizbek from "../assets/images/Azizbek.jpg";
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
type GenericsStore<T> = T | null ;
type GenericsJson<T> = T | [] ;
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
  userPage: UserProfileInterface[] ,
  userMessageIndex: number,
  userMessageText: string,
  myMessage: myMessageInterface[],
  deleteMessageId: string,
  messageUserType: boolean,
  followingPaginationType: boolean,
  maxIndex: number,
  index: number,
  homePageData: ImageApplication[],
  likeDatas: FollowersUser[] | [],
  saveDatas: FollowersUser[] | [],
  comments: GenericsJson<CommentProps[]>
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
  wordsMessageArray: [],
  userPage: [],
  userMessageIndex: 0,
  userMessageText: "",
  myMessage: [{message: "How are you", id: "defaultText"}],
  deleteMessageId: "",
  messageUserType: false,
  followingPaginationType: false,
  maxIndex: 0,
  index: 0,
  homePageData: [
    {
      image: Azizbek,
      id: "49253566730"
    },
    {
      image: Barcelona,
      id: ""
    },
    {
      image: Bill,
      id: ""
    },
    {
      image: Epam,
      id: "47409206265"
    },
    {
      image: Mark,
      id: ""
    },
    {
      image: Messi,
      id: ""
    },
    {
      image: Najot,
      id: ""
    },
    {
      image: Saud,
      id: "31786349062"
    },
    {
      image: Xayrulla,
      id: "2089125940"
    },
    {
      image: Subyektiv,
      id: "49625015011"
    }
  ],
  likeDatas: getItem("instagram-likes") ? JSON.parse(getItem("instagram-likes")!): [],
  saveDatas: getItem("instagram-saves") ? JSON.parse(getItem("instagram-saves")!): [],
  comments: []
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
      })
      state.dateMessagesArray = result
    },
    setWordsMessageArray(state, action:PayloadAction<number>){
      state.wordsMessageArray = wordsArray.slice(0, action.payload)
    },
    setUserPage(state, action:PayloadAction<UserProfileInterface[]>){
      state.userPage = action.payload
    },
    setUserPageIndex(state, action:PayloadAction<number>){
      state.userMessageIndex = action.payload
    },
    setUserMessageText(state, action:PayloadAction<string>){
      state.userMessageText = action.payload
    },
    setMyMessage(state, action:PayloadAction<myMessageInterface>){
      state.myMessage = [...state.myMessage, action.payload]
    }  ,
    setDeleteMessage(state, action:PayloadAction<string>){
      state.myMessage = state.myMessage.filter((item:myMessageInterface) => item.id !== action.payload)
    },
    setDeleteId(state, action:PayloadAction<string>){
      state.deleteMessageId = action.payload 
    },
    setMessageUserType(state, action:PayloadAction<boolean>){
      state.messageUserType = action.payload
    },
    setFollowingPagination(state, action:PayloadAction<boolean>){
      state.followingPaginationType = action.payload
    },
    setMaxIndex(state, action:PayloadAction<number>){
      state.maxIndex = action.payload
    },
    setChangeIndex(state, action:PayloadAction<number>){
      if((state.maxIndex-8) > state.index ){
        state.index += action.payload
      }else{
        state.index = 0
      }
    },
    setChangeDecIndex(state, action:PayloadAction<number>){
      if(state.index > 8){
        state.index -= action.payload
      }else{
        state.index = (state.maxIndex-8)
      }
    },
    setLike(state, action:PayloadAction<FollowersUser>){
      if(!state.likeDatas?.length){
        state.likeDatas = [...state.likeDatas, action.payload]
      }else{
        if(!state.likeDatas.some((item:FollowersUser) => item.id === action.payload.id)){
          state.likeDatas = [...state?.likeDatas, action.payload]
        }else{
          state.likeDatas = state.likeDatas
        }
      }
      setItem("instagram-likes", state.likeDatas)
    },
    setNotLike(state, action:PayloadAction<FollowersUser>){
      state.likeDatas = state.likeDatas.filter((item:FollowersUser) => item.id !== action.payload.id)
      setItem("instagram-likes", state.likeDatas)
    },
    setSave(state, action:PayloadAction<FollowersUser>){
      if(!state.saveDatas.length){
        state.saveDatas = [...state.saveDatas, action.payload]
      } else{
        if(!state.saveDatas?.some((item:FollowersUser) => item.id === action.payload.id)){
          state.saveDatas = [...state.saveDatas, action.payload]
        }else{
          state.saveDatas = state.saveDatas
        }
      }
      setItem("instagram-saves", state.saveDatas)
    },
    setNotSave(state, action:PayloadAction<FollowersUser>){
      state.saveDatas = state.saveDatas.filter((item:FollowersUser) => item.id !== action.payload.id)
      setItem("instagram-saves", state.saveDatas)
    },
    setAddComment(state, action:PayloadAction<CommentProps>){
      state.comments = [...state.comments, action.payload]
    },
    setCleanComment(state, action:PayloadAction<[]>){
      state.comments = action.payload
    }
  },
});
export const Reducer = slice.reducer;
export const {setToken, setUser, setIncIdx, setOpenLoader, setCloseLoader, setGoogleUser, setInsChangeBg, setMainProfile, setSearchBox, setSearchFollowing, setDelFollower, setNotification, setFollowers, setMessages, setDateMessagesArray, setWordsMessageArray, setUserPage, setUserPageIndex, setUserMessageText, setMyMessage, setDeleteMessage, setDeleteId, setMessageUserType, setFollowingPagination, setMaxIndex, setChangeIndex, setChangeDecIndex, setLike, setNotLike, setSave, setNotSave, setAddComment, setCleanComment }
 = slice.actions;
