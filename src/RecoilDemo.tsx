import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';
import { v4 as uid } from "uuid";
import { useInterval } from "usehooks-ts";

interface Item {
  id: string;
  title: string;
  year: number;
  watched: boolean;
}


const itemsAtom = atom<Item[]>({
  key: "itemsAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});


const progressAtom = atom<number>({
  key: "progressAtom",
  default: 0,
});

const ItemList = () => {
  const items = useRecoilValue(itemsAtom);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

const AddItem = () => {
  const setItem = useSetRecoilState(itemsAtom);

  return (
    <button
      onClick={() => {
        setItem((item) => [
          ...item,
          {
            id: uid(),
            title: "TITLE abc",
            year: 1998,
            watched: false,
          },
        ]);
      }}
    >
      Add Item
    </button>
  );
};

const ProgressTracker = () => {
  const progress = useRecoilValue(progressAtom);

  return <div>{Math.trunc(progress * 100)}% watched</div>;
};

const ControlProgress = () => {
  const setProgress = useSetRecoilState(progressAtom);
  useInterval(() => setProgress((p) => p + 1), 1000);

  return <></>;
};



const DebugAtoms = () => {
  // useAtomsDebugValue()
  return null
}

const RecoilDemo = () => {
  return (
    <>
      <RecoilRoot>
        <DebugAtoms />
        <ItemList />
        <AddItem />
        <ProgressTracker />
        <ControlProgress />
      </RecoilRoot>
    </>
  );
};
export default RecoilDemo;
