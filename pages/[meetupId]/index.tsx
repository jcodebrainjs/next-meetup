import { Fragment } from "react";
import Head from "next/head";
import { ObjectId } from "mongodb";
import { queryCollection, queryOne } from "@/lib/getMongoClient";
import MeetupDetail from "../../components/meetups/MeetupDetail";

interface MeetupProps {
  id: string;
  title: string;
  image: string;
  address: string;
  description?: string;
}

interface MeetupDataProps {
  meetupData: MeetupProps;
}

interface QueryCollectionProps {
  _id: ObjectId;
}

interface ParamsProps {
  meetupId: string;
}

interface StaticProps {
  params: ParamsProps;
}

function MeetupDetails(props: MeetupDataProps) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const meetups = await queryCollection("meetup", {}, { _id: 1 });
  return {
    fallback: "blocking",
    paths: meetups.map((meetup: QueryCollectionProps) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context: StaticProps) {
  const { meetupId } = context.params;
  // fetch data from API
  const { _id, ...selectedMeetup } = await queryOne("meetup", {
    _id: new ObjectId(meetupId),
  });
  return {
    props: {
      meetupData: {
        ...selectedMeetup,
        id: _id.toString(),
      },
    },
  };
}

export default MeetupDetails;
