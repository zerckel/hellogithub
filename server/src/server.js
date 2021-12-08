import express from "express";
const cors = require('cors')


export function launch(port) {
  const application = express();
  application.use(cors())

  const corsOptionsDelegate = function (req, callback) {
    callback(null, {origin: false}) // callback expects two parameters: error and options
  }

  application.get("/api/users/:username", cors({origin: false}), (request, response) => {
    // Step 1 - Does User exist in our Database
    //   If True  -> Retrieve from our Database
    //   If False -> Request Github API https://api.github.com/users/$USERNAME
    //            -> Store User information in our Database
    let user = {
      "login": request.params.username,
      "id": 39551159,
      "node_id": "MDQ6VXNlcjM5NTUxMTU5",
      "avatar_url": "https://avatars.githubusercontent.com/u/39551159?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/mehdiKnn",
      "html_url": "https://github.com/mehdiKnn",
      "followers_url": "https://api.github.com/users/mehdiKnn/followers",
      "following_url": "https://api.github.com/users/mehdiKnn/following{/other_user}",
      "gists_url": "https://api.github.com/users/mehdiKnn/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/mehdiKnn/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/mehdiKnn/subscriptions",
      "organizations_url": "https://api.github.com/users/mehdiKnn/orgs",
      "repos_url": "https://api.github.com/users/mehdiKnn/repos",
      "events_url": "https://api.github.com/users/mehdiKnn/events{/privacy}",
      "received_events_url": "https://api.github.com/users/mehdiKnn/received_events",
      "type": "User",
      "site_admin": false,
      "name": "Mehdi Kannouni",
      "company": null,
      "blog": "",
      "location": "Paris",
      "email": null,
      "hireable": null,
      "bio": null,
      "twitter_username": null,
      "public_repos": 16,
      "public_gists": 0,
      "followers": 9,
      "following": 3,
      "created_at": "2018-05-23T08:12:00Z",
      "updated_at": "2021-11-02T18:45:54Z"
    }
    response.json({ user });
  });

  application.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}
