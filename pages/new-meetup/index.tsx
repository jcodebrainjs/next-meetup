import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "components/meetups/NewMeetupForm";

type enteredMeetupDataType = {
  title: string;
  image: string;
  address: string;
  description: string;
};

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData: enteredMeetupDataType) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Next Meetup</title>
        <meta name="description" content="Add your own Next React Meeting" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
}

export default NewMeetupPage;
