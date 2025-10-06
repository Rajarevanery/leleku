import type { IUserData } from "../types/types";

const ProfileIcon = (user_data: IUserData) => {
  const { email, role, username } = user_data;

  console.log(user_data);

  return (
    <div>
      <div className="flex flex-row gap-2">
        <div className="bg-stone-600 w-12 h-12 rounded-full flex justify-center items-center shadow-white shadow-2xl">
          <p className="text-xl font-bold">{username[0]}</p>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold">{username}</span>
          <span className="text-neutral-400 truncate w-[15ch]">{email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
