import { supabase } from "services/supabase";

const getUsersHasPhoneOrZaloId = async () => {
  const { data: dataUsersPhoneZaloId, error: errorUsersPhoneZaloId } =
    await supabase.rpc("get_users_hasPhone_zaloId");
  return { dataUsersPhoneZaloId, errorUsersPhoneZaloId };
};

export { getUsersHasPhoneOrZaloId };
