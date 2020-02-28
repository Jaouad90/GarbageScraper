import { Controller } from "./Controller.js";

export const routes = () =>
{  
  routie('', () => {
  updateUI('overview');
  Controller();
})
  routie({
  overview: () => {
    updateUI('overview');
    Controller();
  },
  'detail/:id' : id => {
    updateUI('detail');
    Controller(id);}
  });
}

export const router = {
	handle: function() {
		if (this.dataset && this.dataset.id) {
			console.log('Router: Handling for ' + this.dataset.id);
			routes.detail(this.dataset.id);
		} else {
			routes.overview();
		}
	}
}

// Update UI and active element by routie event
export function updateUI(route) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
    const activeSection = document.querySelector(`[data-route=${route}]`);
    activeSection.classList.add('active');
  }

