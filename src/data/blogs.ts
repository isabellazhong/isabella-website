import type { BlogFolder } from "../types";

/**
 * Folders group posts by section on /blogs. Opening a folder lists its posts
 * as vertically stacked blocks; each post opens its own subpage at
 * /blogs/:folderId/:postId.
 */
export const blogFolders: BlogFolder[] = [
  {
    id: "machine-learning",
    name: "Machine Learning",
    description: "My Machine Learning Journey Documentation!",
    posts: [
      {
        id: "adam",
        title: "The Bug: Adam vs. AdamW Optimizers",
        date: "2026-09-19",
        summary: "AdamW is the standard optimizer used today. Explore what the small bug in Adam was that led AdamW to be born.",
        content: [
          {
            kind: "paragraph",
            text: "Optimizers are algorithims in place when training a model to help optimize their weights and get better predictions. The standard one we use currently is AdamW. But we also have another optimizer called Adam so what's the difference?",
          },
          { kind: "heading", text: "Adam Optimizer" },
          {
            kind: "paragraph",
            text: "Now, before we talk about what Adam is, let's brief over the why Adam was created in the first place.",
          },
          {
            kind: "paragraph",
            text: `Stochastic Gradient Descent (SGD) has a few limitations in how loss is adjusted. Specifically, it targets the weakness that SGD faces which is adjustment of sparse gradients (gradients that contain mostly zero’s due to lack of data hitting those inputs or other variables i.e. penalization, pre-activation value is negative - caused by ReLU limitations, etc.). 
            Instead, Adam was developed in order to combat these limitations. Essentially, it normalizes and bridges the gap in weight updates (i.e sparse gradient updates are more comparative in scale to dense gradient updates).`
          },
          {
            kind: "paragraph",
            text: "The following describes the math formula involved: "
          },
          {
            kind: "paragraph",
            text: String.raw`Let $\beta_1, \beta_2 \in (0, 1]$ be exponential decay rates.`,
          },
          {
            kind: "paragraph",
            text: String.raw`Let $m_t$ be the first moment vector of the gradient at timestep $t$.`,
          },
          {
            kind: "paragraph",
            text: String.raw`Let $v_t$ be the second moment vector of the gradient at timestep $t$.`,
          },
          {
            kind: "paragraph",
            text: String.raw`Let $\theta_t$ be the weight at timestep $t$.`,
          },
          {
            kind: "paragraph",
            text: String.raw`We initialize $m_0$ and $v_0$ to be 0. Typically, $\beta_1 = 0.9, \beta_2 = 0.999$.`,
          },
          {
            kind: "paragraph",
            text: String.raw`However, as a result it also creates a bias towards zero for these moments, so without going into much detail into how, we can easily implement a bias-correction by defining $\hat{m}_t = \frac{m_t}{1 - \beta_1}$, $\hat{v}_t = \frac{v_t}{1 - \beta_2}$.`,
          },
          {
            kind: "paragraph",
            text: "Thus, we get:"
          }, 
          {
            kind: "latex",
            text: "\\theta_t = \\theta_{t-1}- \\alpha{\\frac{\\hat{m_t}}{\\sqrt{\\hat{v_t}} + \\epsilon}}"
          },
          {
            kind: "paragraph",
            text: "Where we define moments as: "
          },
          {
            kind: "latex",
            text: "\\hat{m_t} = \\beta_1\\hat{m_{t-1}} + (1 - \\beta_1)g_t \\newline \\hat{v_t} = \\beta_2\\hat{v_{t-1}} + (1 - \\beta_2)g_t^2 "
          }, 
          {
            kind: "paragraph",
            text: String.raw`A simple visual of what moments capture: think of the previous moment as the “memory”, and so when we update the moment, it only adjusts it by the new gradient by $x$ amount. You can adjust $\beta_1, \beta_2$ to how much you want the gradient to impact the moment value. $m_t$ represents the mean / average of the gradients (INCLUDING direction), and $v_t$ represents root-mean-square of the mean of the gradients (only magnitude) - the volatility. `
          },
          {
            kind:"paragraph",
            text: String.raw`So, essentially when we preform $\frac{\hat{m_t}}{\sqrt{\hat{v_t}} + \epsilon}$, it is bounded between $\pm1$, creating a “trust region” that gives us better judgement of how to scale $\alpha$. This fraction creates a SNR (signal-to-noise-ratio) where a smaller SNR (closer to zero) implies that there is greater deviation in the current gradient compared to average of previous gradients and scales the update to be smaller, while a larger SNR (closer to 1) implies that there is smaller deviation in the current gradient compared to average, and updates it to have a larger step.  `
          },
          {
            kind: "heading",
            text: "AdamW"
          },
          {
            kind: "paragraph",
            text: "So now that we have covered what Adam is, how does this differ from AdamW?"
          },
          {
            kind: "paragraph",
            text: "Well AdamW is actually just the fixed version of Adam. You see, Adam has a small bug in it in how in includes the regularization penalty (weight decay function)."
          },
          {
            kind: "paragraph",
            text: String.raw`In SGD, there are no additional coupling for the gradient - you just multiply the gradient by $\lambda$. However, this is not the case with Adam. Instead, you calculate the gradient first and then use that to calculate your moments where your loss function is coupled inside $\frac{\hat{m_t}}{\sqrt{\hat{v_t}} + \epsilon}$. So what does this cause? "`
          },
          {
            kind: "paragraph",
            text: "Well, let’s reimagine the moments with the weight decay baked into the gradient: "
          },
          {
            kind: "latex",
            text: "\\begin{align} \\hat{m_t} &= \\beta_1\\hat{m_{t-1}} + (1-\\beta_1)g_t \\newline \\hat{m_t} &= \\beta_1\\hat{m_{t-1}} + (1-\\beta_1)(loss + \\lambda\\theta) \\end{align} "
          },
          {
            kind: "latex",
            text: "\\begin{align} \\hat{v_t} &= \\beta_2\\hat{v_{t-1}} + (1-\\beta_2)g_t^2 \\newline \\hat{v_t} &= \\beta_2\\hat{v_{t-1}} + (1-\\beta_2)(loss + \\lambda\\theta)^2 \\newline \\hat{v_t} &=  \\beta_2\\hat{v_{t-1}} + (1-\\beta_2)(loss^2 + 2*loss*\\lambda\\theta + \\lambda^2\\theta^2) \\newline \\hat{v_t} &\\approx \\beta_2\\hat{v_{t-1}} + (1-\\beta_2)*loss^2 \\end{align}"
          },
          {
            kind: "paragraph",
            text: "As you can see, squaring the gradient in the second moment actually makes the penalty negligible. "
          },
          {
            kind: "paragraph",
            text: "Instead, AdamW fixes this error, by applying the penalty after. Thus, it now looks like this: "
          },
          {
            kind: "latex",
            text: "\\theta_t = \\theta_{t-1} - \\alpha(\\frac{\\hat{m_t}}{\\sqrt{\\hat{v_t}}+ \\epsilon} + \\lambda\\theta_{t-1})"
          },
          {
            kind: "paragraph",
            text: "Pretty simple right? The extra 'W' in AdamW basically says it's the Adam optimizer but with (W)eight decay fixed :)"
          }
        ],
      },
    ],
  }
];
