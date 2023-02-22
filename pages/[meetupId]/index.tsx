import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  const router = useRouter();
  return (
    <MeetupDetail
      image={props}
      title="A First Meetup"
      address="Some Street 4, Some City, USA"
      description="Description"
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        }
      },
      {
        params: {
          meetupId: 'm2',
        }
      },
    ]
  }

  export async function getStaticProps(context) {
    const { meetupId } = context.params;

    // fetch data from API
    return {
      props: {
        meetupData: {
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Alsterblick_Hamburg.jpg/1920px-Alsterblick_Hamburg.jpg",
          id: meetupId,
          title: "A First Meetup",
          address: "Some Street 4, Some City, USA",
          description: "Description",
        },
      },
      revalidate: 1,
    };
  }

  export default MeetupDetails;
