import { useEffect } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "components/meetups/MeetupList";

interface Meetup {
  id: string;
  title: string;
  image: string;
  address: string;
  description?: string;
}

interface HomePageProps {
  meetups: Meetup[];
}

const DUMMY_MEETUPS: Meetup[] = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Alsterblick_Hamburg.jpg/1920px-Alsterblick_Hamburg.jpg",
    address: "Some City",
    description: "Description",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Alsterblick_Hamburg.jpg/1920px-Alsterblick_Hamburg.jpg",
    address: "Some City",
    description: "Description",
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Alsterblick_Hamburg.jpg/1920px-Alsterblick_Hamburg.jpg",
    address: "Some City",
    description: "Description",
  },
];

function HomePage(props: HomePageProps) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.res;
//
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     }
//   }
// }

export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://dcotelessa:6TxmovK1ofh9gwkI@nextmeetupdemo.77dfao0.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetup");

  const meetups = await meetupsCollection.find().toArray(); // find all

  client.close();

  return {
    props: {
      meetups: meetups.map(({ _id, ...data }) => ({
        ...data,
        id: _id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
