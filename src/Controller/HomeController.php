<?php

namespace App\Controller;

use App\Entity\Vote;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        $repo = $this->getDoctrine()->getRepository(Vote::class);

        $votes = $repo->findVotes();
        $songs = $repo->findTotals();

        return $this->render('home/index.html.twig', [
            'votes' => $votes,
            'songs' => $songs
        ]);
    }
}
