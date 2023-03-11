import React from "react";

type Props = {};

const FollowBar = (props: Props) => {
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <div className="text-white text-xl font-semibold">Who to follow</div>
        <div className="flex flex-col gap-6 mt-4">{/* Todo: Users List */}</div>
      </div>
      FollowBar
    </div>
  );
};

export default FollowBar;
