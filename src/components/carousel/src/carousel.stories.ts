import "@aileron/card";
import "@aileron/carousel";
import "@aileron/icon";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import imgLg2x1 from "../assets/fpo--2x1--720x360--005.jpg";
import imgFPO from "../assets/fpo.jpg";

export default {
  title: "Components/Carousel",
  component: "adc-carousel"
};

export const Carousel1Example = (args) => {
  return html`
    <adc-carousel
      ?isPlayable="${ifDefined(args?.isPlayable)}"
      slideDelay="${ifDefined(args?.slideDelay)}"
    >
      <adc-card>
        <h2>Card 1 Heading</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </adc-card>
      <adc-card>
        <h2>Card 2 Heading</h2>
        <p>
          Lorem repellat iste porro quidem tempore cupiditate et. Et incidunt eum quidem laboriosam
          unde dolor sunt harum non. Quas animi eos.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </adc-card>
      <adc-card>
        <h2>Card 3 Heading</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </adc-card>
      <adc-card>
        <h2>Card 4 Heading</h2>
        <p>
          Soluta eius perspiciatis culpa occaecati necessitatibus laudantium sunt. Ut non qui.
          Excepturi exercitationem qui. Pariatur enim at ut dolor quis odio ducimus et.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </adc-card>
      <adc-card>
        <h2>Card 5 Heading</h2>
        <p>
          Lorem repellat iste porro quidem tempore cupiditate et. Et incidunt eum quidem laboriosam
          unde dolor sunt harum non. Quas animi eos.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </adc-card>
      <adc-card>
        <h2>Card 6 Heading</h2>
        <p>
          Lorem repellat iste porro quidem tempore cupiditate et. Et incidunt eum quidem laboriosam
          unde dolor sunt harum non. Quas animi eos.
        </p>
        <p>
          Repellendus qui iste reprehenderit aut perspiciatis. Eaque ipsam corporis doloremque. At
          facilis temporibus voluptatem at. Mollitia et sit et eveniet ea aliquam numquam. Nemo
          cumque odio sed dicta.
        </p>
      </adc-card>
      <adc-card>
        <h2>Card 7 Heading</h2>
        <p>
          Lorem repellat iste porro quidem tempore cupiditate et. Et incidunt eum quidem laboriosam
          unde dolor sunt harum non. Quas animi eos.
        </p>
        <p>
          Repellendus qui iste reprehenderit aut perspiciatis. Eaque ipsam corporis doloremque. At
          facilis temporibus voluptatem at. Mollitia et sit et eveniet ea aliquam numquam. Nemo
          cumque odio sed dicta.
        </p>
      </adc-card>
      <adc-card>
        <h2>Card 8 Heading</h2>
        <p>
          Lorem repellat iste porro quidem tempore cupiditate et. Et incidunt eum quidem laboriosam
          unde dolor sunt harum non. Quas animi eos.
        </p>
        <p>
          Repellendus qui iste reprehenderit aut perspiciatis. Eaque ipsam corporis doloremque. At
          facilis temporibus voluptatem at. Mollitia et sit et eveniet ea aliquam numquam. Nemo
          cumque odio sed dicta.
        </p>
      </adc-card>
    </adc-carousel>
  `;
};

Carousel1Example.args = {
  isPlayable: true,
  slideDelay: 500
};

Carousel1Example.storyName = "Default";

Carousel1Example.parameters = {
  docs: {
    source: {
      code: '<adc-link target="_self" href="#" hiddenLabelText="Hidden Aria Text">Insert Link Text Here</adc-link>'
    }
  },
  jest: "carousel.test.ts"
};

export const Carousel2Example = () => {
  return html`
    <adc-carousel>
      <adc-card>
        <adc-card-media src=${imgLg2x1} slot="media"></adc-card-media>
        <h2>Image Plus Text Card</h2>
        <p>Eaque ipsam corporis doloremque. At facilis temporibus voluptatem at.</p>
      </adc-card>
      <adc-card>
        <h2>A Text only Card</h2>
        <p>
          Lorem repellat iste porro quidem tempore cupiditate et. Et incidunt eum quidem laboriosam
          unde dolor sunt harum non. Quas animi eos.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
      </adc-card>
      <adc-card>
        <adc-card-media src=${imgFPO} slot="media"></adc-card-media>
        <h2>The Third Card</h2>
        <p>
          Nemo cumque odio sed dicta. Et incidunt eum quidem laboriosam unde dolor sunt harum non.
        </p>
      </adc-card>
      <adc-card>
        <adc-card-media src=${imgLg2x1} slot="media"></adc-card-media>
        <h2>Card Number 4</h2>
        <p>
          Quas animi eos. Repellendus qui iste reprehenderit aut perspiciatis. Eaque ipsam corporis
          doloremque.
        </p>
      </adc-card>
      <adc-card>
        <adc-card-media src=${imgFPO} slot="media"></adc-card-media>
        <h2>Fifth Card</h2>
      </adc-card>
      <adc-card>
        <adc-card-media src=${imgLg2x1} ratio="square" slot="media"></adc-card-media>
        <h2>Square Sixth Card</h2>
      </adc-card>
      <adc-card>
        <adc-card-media src=${imgLg2x1} slot="media"></adc-card-media>
        <h2>Seventh Card</h2>
      </adc-card>
      <adc-card>
        <adc-card-media src=${imgFPO} slot="media"></adc-card-media>
        <h2>Ocho</h2>
      </adc-card>
      <adc-card>
        <adc-card-media src=${imgLg2x1} slot="media"></adc-card-media>
        <h2>Ninth and Last</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
      </adc-card>
    </adc-carousel>
  `;
};

Carousel2Example.args = {
  disabled: false
};

Carousel2Example.storyName = "Carousel with Images";

Carousel2Example.parameters = {
  docs: {
    source: {
      code: '<adc-link target="_self" href="#" hiddenLabelText="Hidden Aria Text">Insert Link Text Here</adc-link>'
    }
  },
  jest: "carousel.test.ts"
};

export const Carousel3Example = () => {
  return html`
    <adc-carousel page-size="1">
      <adc-card>
        <adc-card-media src=${imgLg2x1} slot="media"></adc-card-media>
      </adc-card>
      <adc-card>
        <adc-card-media src=${imgFPO} slot="media"></adc-card-media>
      </adc-card>
      <adc-card>
        <adc-card-media src=${imgLg2x1} slot="media"></adc-card-media>
      </adc-card>
    </adc-carousel>
  `;
};

Carousel3Example.args = {
  disabled: false
};

Carousel3Example.storyName = "Carousel with full bleed image";

Carousel3Example.parameters = {
  docs: {
    source: {
      code: '<adc-link target="_self" href="#" hiddenLabelText="Hidden Aria Text">Insert Link Text Here</adc-link>'
    }
  },
  jest: "carousel.test.ts"
};
