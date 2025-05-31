import { useSelector, useDispatch } from "react-redux";
import { loginUserAsync , registerUserAsync , fetchUsersAsync , logoutUserAsync , editUserAsync , deleteUserAsync ,addUserAsync} from "@/redux/Slices/UserSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const users = useSelector((state) => state.user.users);
  const role = useSelector((state) => state.user.role);
  

 
  const login = (credentials) => dispatch(loginUserAsync(credentials));
  const register = (credentials) => dispatch(registerUserAsync(credentials));
  const addUser = (credentials) => dispatch(addUserAsync(credentials));
  const fetchUsers = () => dispatch(fetchUsersAsync());
  const logout = () => dispatch(logoutUserAsync());
  const editUser = (id, data) => dispatch(editUserAsync({ userId: id, userData: data }));
  
  const deleteUser = (userId) => dispatch(deleteUserAsync(userId));
  


  return { user, users, isLoggedIn, login  , register , fetchUsers , logout , editUser , deleteUser , addUser , role};
};

