<?php

namespace App\Controller;

use App\Entity\Vote;
use App\Form\VoteType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(Request $request)
    {
        $vote = new Vote();
        $form = $this->createForm(VoteType::class, $vote);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $manager = $this->getDoctrine()->getManager();

            $vote->setSong($data->getSong());
            $vote->setQuantity($data->getQuantity());
            $manager->persist($vote);

            $manager->flush();

            if ($request->isXmlHttpRequest()) {
                return $this->render('home/voterow.html.twig', [
                    'vote' => $vote
                ]);
            }

            return $this->redirectToRoute('home');
        }

        $repo = $this->getDoctrine()->getRepository(Vote::class);

        $votes = $repo->findVotes();
        $songs = $repo->findTotals();

        return $this->render('home/index.html.twig', [
            'votes' => $votes,
            'songs' => $songs,
            'form'  => $form->createView()
        ]);
    }

    /**
     * @Route("/delete/{vote}", name="delete", requirements={"vote"="\d+"})
     */
    public function delete(Vote $vote)
    {
        $manager = $this->getDoctrine()->getManager();

        $manager->remove($vote);
        $manager->flush();

        return $this->redirectToRoute('home');
    }
}
