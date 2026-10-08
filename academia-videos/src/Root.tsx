import React from "react";
import { Composition } from "remotion";
import { BUMPER_FRAMES, LogoBumper } from "./LogoBumper";
import { FILM_FPS, MarketingFilm, filmFrames } from "./film/Film";
import { StudentJourney, journeyFrames } from "./StudentJourney";
import { TeacherPitch, teacherFrames } from "./TeacherPitch";
import { FPS, SITE_URL } from "./theme";

const LANGS = ["ar", "en"] as const;

export const RemotionRoot: React.FC = () => (
  <>
    {LANGS.map((lang) => (
      <React.Fragment key={lang}>
        <Composition
          id={`StudentJourney-${lang}`}
          component={StudentJourney}
          durationInFrames={journeyFrames()}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={{ lang, siteUrl: SITE_URL }}
        />
        <Composition
          id={`TeacherPitch-${lang}`}
          component={TeacherPitch}
          durationInFrames={teacherFrames()}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={{ lang, siteUrl: SITE_URL }}
        />
      </React.Fragment>
    ))}
    <Composition id="MarketingFilm-ar" component={MarketingFilm} durationInFrames={filmFrames()} fps={FILM_FPS} width={1920} height={1080} />
    <Composition id="LogoBumper" component={LogoBumper} durationInFrames={BUMPER_FRAMES} fps={FPS} width={1080} height={1080} defaultProps={{ lang: "ar" as const }} />
  </>
);
