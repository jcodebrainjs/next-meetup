import { Fragment } from "react;";
import Head from "next/head";
import { ObjectId } from "mongodb";
import { queryCollection } from "@/lib/mongoConnect";
import MeetupList from "components/meetups/MeetupList";

interface QueryCollectionProps {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  description?: string;
}

interface MeetupProps {
  id: string;
  title: string;
  image: string;
  address: string;
  description?: string;
}

interface HomePageProps {
  meetups: MeetupProps[];
}

function HomePage(props: HomePageProps) {
  return (
    <Fragment>
      <Head>
        <title>Next Meetup</title>
        <meta
          name="description"
          content="Browse thru a list of Next React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
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
  const meetups = (await queryCollection("meetup")) as QueryCollectionProps[]; // find all
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
