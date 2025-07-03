import mixpanel, { Dict } from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_API_KEY as string);

export const isMixpanelActive = process.env.NODE_ENV !== "development";

const actions = {
  identify: (id?: string) => {
    if (isMixpanelActive) mixpanel.identify(id);
  },
  track: (name: string, props?: Dict) => {
    if (isMixpanelActive) mixpanel.track(name, props);
  },
  track_pageview: () => {
    if (isMixpanelActive) mixpanel.track_pageview();
  },
  reset: () => {
    if (isMixpanelActive) mixpanel.reset();
  },
};

export const Mixpanel = actions;
